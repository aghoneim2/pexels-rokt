import SrcModel from "./SrcModel";

export default class PhotoModel {
  public alt!: string;
  public avg_color!: string;
  public height!: number;
  public id!: number;
  public liked!: boolean;
  public photographer!: string;
  public photographer_id!: number;
  public photographer_url!: string;
  public src = new Array<SrcModel>();
  public url!: string;
  public width!: number;
}
