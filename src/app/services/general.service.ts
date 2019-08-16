import { Injectable } from '@angular/core';
import { UserDetails } from '../models/api-models/loginModels';
import { BehaviorSubject, Subject } from 'rxjs';
import { eventsConst } from '../models/eventsConst';
import { IUlist } from '../models/interfaces/ulist.interface';

@Injectable()
export class GeneralService {

  public talkToSalesModal: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isCurrencyPipeLoaded = false;

  public menuClickedFromOutSideHeader: BehaviorSubject<IUlist> = new BehaviorSubject<IUlist>(null);
  public invalidMenuClicked: BehaviorSubject<{next: IUlist, previous: IUlist}>
      = new BehaviorSubject<{next: IUlist, previous: IUlist}>(null);

  get companyUniqueName(): string {
    return this.companyUniqName;
  }

  set companyUniqueName(companyUniqueName: string) {
    this.companyUniqName = companyUniqueName;
  }

  get sessionId(): string {
    return this.sessionID;
  }

  set sessionId(sessionId: string) {
    this.sessionID = sessionId;
  }

  // currencyType define specific type of currency out of four type of urrencyType a.1,00,00,000 ,b.10,000,000,c.10\'000\'000,d.10 000 000
  get currencyType(): string {
    return this.currType;
  }

  set currencyType(currencyType: string) {
    this.currType = currencyType;

  }

  public eventHandler: Subject<{ name: eventsConst, payload: any }> = new Subject();
  public IAmLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private companyUniqName: string;

  // there will be four type of currencyType a.1,00,00,000 (INR),b.10,000,000,c.10\'000\'000,d.10 000 000
  private currType = '1,00,00,000';

  private sessionID: string;

  public resetGeneralServiceState() {
    this.sessionId = null;
    this.companyUniqueName = null;
  }

  public SetIAmLoaded(iAmLoaded: boolean) {
    this.IAmLoaded.next(iAmLoaded);
  }
}
