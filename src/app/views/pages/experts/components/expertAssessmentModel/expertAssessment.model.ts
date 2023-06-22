export class ExpertAssessmentModel{
    message:string;
    result:{
        assessment: {};
        assessmentId: number;
        assessmentRequesterId:number;
        assessmentRequesterName:string;
        bookingDate:string;
        expertId:number;
        id:number;
        languageId:number;
        languageName:string;
        preAssessmentMapping: [];
        preRequisiteMapping:[];
        serviceTypeId: number;
        serviceTypeName:string;
        timezoneId:number;
        timezoneName:string;
    }
    status:boolean;

}