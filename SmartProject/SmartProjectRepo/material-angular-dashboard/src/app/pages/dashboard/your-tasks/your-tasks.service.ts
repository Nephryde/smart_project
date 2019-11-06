import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class YourTasksService {

    //public advanceTableData = []

    // mapToArray(item){
    //     let array = [];

    //     for(const key of Object.keys(item)){
    //         if(typeof item[key] === 'object')
    //             array = array.concat(this.mapToArray(item[key]))
    //         else {
    //             if(key!=='id')
    //                 array.push(item[key]);
    //         }
    //     }
    //     return array;
    // }

    constructor(private http : HttpClient ) { }

    // public getTasksList() {       
    //     this.http.get(environment.apiBaseUrl + '/Dashboard').subscribe((res: any) => {
    //         this.advanceTableData = res.map(item => this.mapToArray(item));
    //         console.log(this.advanceTableData);
    //     });
    //     return this.advanceTableData;
    // }

    getTasksList() {
        return this.http.get(environment.apiBaseUrl + '/Dashboard');
    }
    
    public getAdvancedHeaders() {
    return [
        {
        name: '#',
        sort: null,
        },
        {
        name: 'Tytuł',
        sort: 0,
        },
        {
        name: 'Autor',
        sort: 0,
        },
        {
        name: 'Typ zagadnienia',
        sort: null,
        },
        {
        name: 'Priorytet',
        sort: null,
        },
        {
        name: 'Data dodania',
        sort: 0,
        },
        {
        name: 'Status',
        sort: null,
        },
        {
        name: 'Progres',
        sort: 0,
        }

    ];
    }

    // public getAdvancedTableNumOfPage(countPerPage) {
    //     return Math.ceil(this.advanceTableData.length / countPerPage);
    // }

    // public getAdvancedTablePage(page, countPerPage) {
    //     return this.advanceTableData.slice((page - 1) * countPerPage, page * countPerPage);
    // }

    // public click() {
    //     return this.advanceTableData;
    // }

    // public changeAdvanceSorting(order, index) {
    //     this.advanceTableData = this.sorting(this.advanceTableData, order, index);
    // }
    
    // private sorting(array, order, value) {
    // const compareFunction = (a, b) => {
    //     if (a[value] > b[value]) {
    //     return 1 * order;
    //     }
    //     if (a[value] < b[value]) {
    //     return -1 * order;
    //     }
    //     return 0;
    // };
    // return array.sort(compareFunction);
    // }

}