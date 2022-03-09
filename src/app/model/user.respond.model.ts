
import { UserModel } from "./user.model";

export class UserResponseModel {

  public page: number;

  public per_page: number;

  public total_page: number;

  public data: Array<UserModel>;

  constructor(
    page: number,
    per_page: number,
    total_page: number,
    data: Array<UserModel>
) {
    this.page = page
    this.per_page = per_page
    this.total_page = total_page
    this.data = data
  }

}
