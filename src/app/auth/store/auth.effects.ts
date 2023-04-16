import { Actions, ofType} from "@ngrx/effects";
import * as AuthActions from "./auth.actions";
//effects kriegen alle dispatches mit!
export class AuthEffects{

  //trigger effect only on LOGIN_START
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START)
  )

  constructor(private actions$: Actions){

  }
}

// old
// @Effect
// authLogin = this.actions$.pipe(...)

// new
// authLogin = createEffect(() => this.actions$.pipe(...));
