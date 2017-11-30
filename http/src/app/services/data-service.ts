import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppError } from './../common/app-error';
import { NotFoundError } from './../common/not-found-error';
import { BadInput } from './../common/bad-input';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {

  constructor(private url: string, private http: Http) { }

  getAll() {
    return this.http.get(this.url)
      .catch(this.handleErrors);
  }

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource))
      .catch(this.handleErrors);
  }

  update(resource) {
    return this.http.patch(this.url+ '/' + resource.id, JSON.stringify({isRead: true}))
      .catch(this.handleErrors);
  }

  delete(id) {
    return this.http.delete(this.url+ '/' + id)
      .catch(this.handleErrors);
  }

  handleErrors(error: Response) {

    if (error.status === 400)
      return Observable.throw(new BadInput(error.json()));

    if (error.status === 404)
      return Observable.throw(new NotFoundError());

    return Observable.throw(new AppError(error.json()));
  }
}
