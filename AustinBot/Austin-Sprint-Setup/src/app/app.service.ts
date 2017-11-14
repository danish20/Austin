import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Sprint} from './sprint'

@Injectable()
export class AppService {
  private heroesUrl = 'https://slack.com/api/users.list';  // URL to web api
  private userNames:any;
  headerDict = {
    'Content-type': 'application/json',
    'Authorization': 'Bearer xoxb-235588149911-MX1vpwmxM4LPSgdaT7qe9XrB'
    }
  
  headerObj = {                                                                                                                                                                                 
    headers: new Headers(this.headerDict), 
  };
  constructor(private http: Http) { }

  getSprints(): Promise<Array<Sprint>> {
    return this.http
      .get(this.heroesUrl,this.headerObj)
      .toPromise()
      .then((response) => {
        return response.json().data as Sprint[];
      })
      .catch(this.handleError);
  }


  getUserNames(){
    return this.getSprints()
      .then(sprints => this.userNames=sprints);
  }

//   save(hero: Hero): Promise<Hero> {
//     if (hero.id) {
//       return this.put(hero);
//     }
//     return this.post(hero);
//   }

//   delete(hero: Hero): Promise<Response> {
//     const headers = new Headers();
//     headers.append('Content-Type', 'application/json');

//     const url = `${this.heroesUrl}/${hero.id}`;

//     return this.http
//       .delete(url, { headers: headers })
//       .toPromise()
//       .catch(this.handleError);
//   }

//   // Add new Hero
//   private post(hero: Hero): Promise<Hero> {
//     const headers = new Headers({
//       'Content-Type': 'application/json'
//     });

//     return this.http
//       .post(this.heroesUrl, JSON.stringify(hero), { headers: headers })
//       .toPromise()
//       .then(res => res.json().data)
//       .catch(this.handleError);
//   }

//   // Update existing Hero
//   private put(hero: Hero): Promise<Hero> {
//     const headers = new Headers();
//     headers.append('Content-Type', 'application/json');

//     const url = `${this.heroesUrl}/${hero.id}`;

//     return this.http
//       .put(url, JSON.stringify(hero), { headers: headers })
//       .toPromise()
//       .then(() => hero)
//       .catch(this.handleError);
//   }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}