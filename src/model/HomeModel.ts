import PhotoModel from "./PhotoModel";

export default class HomeModel {
  public imgList = new Array<PhotoModel>();
  public prev_page!: string;
  public next_page!: string;
}
