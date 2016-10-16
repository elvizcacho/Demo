
var SupplierService = require('../../libs/supplier-service');

SupplierService(function(client){
  SupplierService = client;
  //console.log(SupplierService.describe().service.binding.MaintainBundle_V1.input['Supplier[]']);
});

module.exports.createSupplier = function (req, res, next) {
  var suppliers = (req.body.length) ? req.body : [req.body];
  console.log({taxInfo: suppliers[0].taxInfo});
  //Suplier
  suppliers[0].SupplierIndicator = true;
  //suppliers[0].ObjectNodeSenderTechnicalID = 1;
  //Address
  suppliers[0].AddressInformation = [{
    attributes: {
      actionCode: '01',
      addressUsageListCompleteTransmissionIndicator: 'true'
    },
    ObjectNodeSenderTechnicalID: 1,
    AddressUsage : [{
      ObjectNodeSenderTechnicalID: 1,
      AddressUsageCode: 'XXDEFAULT',
      DefaultIndicator: false
    }],
    Address: {
      PostalAddress: {
        CountryCode: 'US',
        StreetName: suppliers[0].address.StreetName,
        HouseID: suppliers[0].address.StreetNumber,
        CityName: suppliers[0].address.CityName,
        RegionCode: suppliers[0].address.RegionCode,
        StreetPostalCode: suppliers[0].address.StreetPostalCode,
        TaxJurisdictionCode: suppliers[0].address.RegionCode
      },
      WebURI: 'www.acmeinc.com'
    }
  }];
  
  suppliers[0].ContactPerson = {
    attributes: {
      actionCode: '01'
    },
    ObjectNodeSenderTechnicalID: '04',
    DefaultContactPersonIndicator: 'true',
    FormOfAddressCode: '0002',
    AcademicTitleCode: '0002',
    GivenName: suppliers[0].contactPerson.GivenName,
    FamilyName: suppliers[0].contactPerson.FamilyName
  };
  
  suppliers[0].BankDetails = {
    attributes: {
      actionCode: '01'
    },
    ObjectNodeSenderTechnicalID: 17,
    ID: 'BD01',
    BankInternalID: 69,
    BankAccountID: suppliers[0].bankDetails.BankAccountID,
    BankAccountTypeCode: 10,
    BankAccountHolderName: 'Silverstar Wholesale Corp',
    ValidityPeriod: {
      StartDate: '1999-01-24',
      EndDate: '9999-01-25'
    }
  };
  
  suppliers[0].PurchasingData = {
    attributes: {
      actionCode: '01'
    },
    ObjectNodeSenderTechnicalID: 16,
    CashDiscountTermsCode: '0004',
    IncotermsCode: 'FCA',
    IncotermsLocationName: 'Destination',
    PurchaseOrderCurrencyCode: 'USD',
    PurchasingBlockIndicator: true,
    CustomerIDAtSupplier: 'SUPPLIER01',
    PurchaseOrderConfirmationRequiredCode: '02'
  };
  
  suppliers[0].DeviantTaxClassification = {
    attributes: {
      actionCode: '01'
    },
    ObjectNodeSenderTechnicalID: '02',
    CountryCode: 'US',
    TaxIdentificationNumberTypeCode: '2',
    PartyTaxID: suppliers[0].taxInfo.PartyTaxID
  };
  
  suppliers[0].WithholdingTaxClassification = {
    attributes: {
      actionCode: '01'
    },
    ObjectNodeSenderTechnicalID: '03',
    CountryCode: 'US',
    TaxTypeCode: '2',
    TaxRateTypeCode: '1'
  };
  
  suppliers[0].AttachmentFolder = {
    attributes: {
      DocumentListCompleteTransmissionIndicator: 'true'
    },
    Document: {
      attributes: {
        ActionCode: '01'
      },
      VisibleIndicator: true,
      CategoryCode: 2,
      TypeCode: '10001',
      MIMECode: 'image/jpg',
      Name: 'W9',
      AlternativeName: 'W9',
      Description: 'IRS Form W-9'
    }
  };
  
  delete suppliers[0].AttachmentFolder;
  delete suppliers[0].WithholdingTaxClassification;
  delete suppliers[0].address;
  delete suppliers[0].contactPerson;
  delete suppliers[0].bankDetails;
  delete suppliers[0].taxInfo;
  
  
  console.log(suppliers[0]);
  SupplierService.MaintainBundle_V1({
    Supplier: suppliers
  }, function (err, result, body, soapHeader) {
    console.log(result);
    res.send(result);
  });
  
};


/*
TaxTypeCode: {
  attributes: {
    listID: ''
  },
  value: 2
},
TaxRateTypeCode: {
  attributes: {
    listID: ''
  },
  value: 1
}

*/
