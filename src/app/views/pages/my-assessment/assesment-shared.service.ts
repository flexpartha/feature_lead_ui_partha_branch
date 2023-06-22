import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class AssesmentSharedService {
  private assesment: Record<string, any> = {};
  constructor() {}
  getAssesment() {
    return this.assesment;
  }

  update = (data: any = {}, callback?: () => void) => {
    this.assesment = {
      ...this.assesment,
      ...data,
    };
    callback && "function" === typeof callback && callback();
  };
  clear() {
    this.assesment = {};
  }
  formatAnswers = (item): any[] => {
    if (item.answers && item.answers.length) {
      return {
        ...item,
        answersArray: JSON.parse(item.answers),
      };
    }
    return item;
  };

  getUploadFileArray(fileArray) {
    const fileData: any = [];
    fileArray?.map((file) => {
      const fileObj = {
        name: decodeURI(file?.split("_").pop()),
        blobUrl: file,
      };
      fileData.push(fileObj);
    });
    return fileData;
  }

  getBlobUrlArray(fileArray) {
    return fileArray?.length ? fileArray.map((file) => file?.blobUrl) : []
  }

  formatAnswersAndFileName = (item, mapArray) => {
    if (item.answers && item.answers.length) {
      const mapIndex = mapArray?.findIndex((data)=> data.preAssessmentId === item.id)
      if (item?.isFileUpload && mapIndex !== -1 && mapArray[mapIndex]?.fileUploadUrls?.length) {
        item.fileUploadArray = this.getUploadFileArray(
          JSON.parse(mapArray[mapIndex]?.fileUploadUrls)
        );
      } else {
        item.fileUploadArray = [];
      }
      return {
        ...item,
        answersArray: JSON.parse(item.answers),
        permissionArray: item?.permissions?.length ? JSON.parse(item?.permissions) : []
      };
    }
    return item;
  }
}
