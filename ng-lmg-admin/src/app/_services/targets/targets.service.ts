import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TargetsService {

  constructor() {
  }

  sortTargets(targets) {
    /*
    Function should sort targets by looking at their next_target_id
    Observation: last target can point to the first one - road repeated
    */
    /*
    targets are received as an array
    1.Find the last target - next_target_id should be null
    2.Find the target that points out to the last one
     */
    console.log('what we are working on', targets, 'size is', targets.length);

    let sortedArrays = [];
    let lastId: string;
    do {
      for (let target of targets) {
        if (target['next_target_id'] == null) {
          sortedArrays.push(target);
          lastId = target['id'];
          console.log('last Id', lastId)
        }
        console.log('next', target['next_target_id'], 'last id', lastId);
        if (target['next_target_id'] == lastId) {
          console.log(' else if');
          sortedArrays.unshift(target)
        }
      }
      console.log('loop done, ', sortedArrays.length)
    } while (sortedArrays.length == targets.length);
    return sortedArrays;
  }

  sortHierarchy(targets) {
    let sortedArrays = [];

    targets = targets.sort(function(a, b){
      return a['hierarchy'] - b['hierarchy']
    });

    return targets
  }


  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
}
