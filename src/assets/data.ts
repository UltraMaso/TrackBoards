
 

export class PageModel{
title:string;
areas:areaTransformerModel[];

}

export class areaTransformerModel{
 
    headers:any[];
    values:TransformerInfoModel[];
}
export class areaFeederModel{
 
    headers:any[];
    values:FeederInfoModel[];
}

export class areaLCModel{
 
    headers:any[];
    values:LoadCentreInfoModel[];
}

export class areaConsolodatedModel{
 
    headers:any[];
    values:ConsolidatedInfoModel[];
}

export class areaPosModel{
 
    headers:any[];
    values:PosInfoModel[];
}


export class TransformerInfoModel{
    sdc: string;
    substation:string;
    transSize:string;
    trasnsDescription:string;
    outgateDate:string;
    comments:string;
   cost:string;
    update:string;
}

export class FeederInfoModel{
    sdc: string;
    substation:string;
    feederDesc:string;
    BreakerType:string;
    outgateDate:string;
    comments:string;
   cost:string;
}

export class LoadCentreInfoModel{
 
    sdc: string;
    substation:string;
    feederDesc:string;
    distributorDescprition:string;
    loadCentreType:string;
    quantities:string;
    outgateDate:string;
    comments:string;
}

export class ConsolidatedInfoModel{
 
    sdc: string;
    month:string;
    TransNmame:string;
    FeederBoard:string;
    loadCentre:string;
 
}
export class PosInfoModel{
 
    sdc: string;
    PMO9:string;
    CMO2:string;
    TA01:string;
    POS:string
}

