// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private loggedIn = false;

//   setLoginStatus(status: boolean): void {
//     this.loggedIn = status;
//     localStorage.setItem('isLoggedIn', JSON.stringify(status));
//   }

//   isLoggedIn(): boolean {
//     const stored = localStorage.getItem('isLoggedIn');
//     return stored ? JSON.parse(stored) : false;
//   }

//   logout(): void {
//     this.loggedIn = false;
//     localStorage.removeItem('isLoggedIn');
//   }
// }

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private loggedIn = false;
//   private patientId: number | null = null;

//   setLoginStatus(status: boolean): void {
//     this.loggedIn = status;
//     localStorage.setItem('isLoggedIn', JSON.stringify(status));
//   }

//   isLoggedIn(): boolean {
//     const stored = localStorage.getItem('isLoggedIn');
//     return stored ? JSON.parse(stored) : false;
//   }

//   setPatientId(id: number): void {
//     this.patientId = id;
//     localStorage.setItem('patientId', id.toString());
//   }

//   getPatientId(): number | null {
//     const stored = localStorage.getItem('patientId');
//     return stored ? parseInt(stored, 10) : null;
//   }

//   logout(): void {
//     this.loggedIn = false;
//     this.patientId = null;
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('patientId');
//   }
// }

// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private loggedIn = false;
//   private patientId: number | null = null;
//   private userRole: string | null = null;

//   setLoginStatus(status: boolean): void {
//     this.loggedIn = status;
//     localStorage.setItem('isLoggedIn', JSON.stringify(status));
//   }

//   isLoggedIn(): boolean {
//     const stored = localStorage.getItem('isLoggedIn');
//     return stored ? JSON.parse(stored) : false;
//   }

//   setPatientId(id: number): void {
//     this.patientId = id;
//     localStorage.setItem('patientId', id.toString());
//   }

//   getPatientId(): number | null {
//     const stored = localStorage.getItem('patientId');
//     return stored ? parseInt(stored, 10) : null;
//   }

//   setUserId(userId: number): void {
//     localStorage.setItem('userId', userId.toString());
//   }

//   getUserId(): number | null {
//     const stored = localStorage.getItem('userId');
//     return stored ? parseInt(stored, 10) : null;
//   }

//   setUserRole(role: string): void {
//     this.userRole = role;
//     localStorage.setItem('userRole', role);
//   }

//   getUserRole(): string | null {
//     return localStorage.getItem('userRole');
//   }

//   logout(): void {
//         this.loggedIn = false;
//         this.patientId = null;
//         this.userRole = null;
//         localStorage.removeItem('isLoggedIn');
//         localStorage.removeItem('patientId');
//         localStorage.removeItem('userRole');
//       }
// }


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private patientId: number | null = null;
  private userRole: string | null = null;

  setLoginStatus(status: boolean): void {
    this.loggedIn = status;
    localStorage.setItem('isLoggedIn', JSON.stringify(status));
  }

  isLoggedIn(): boolean {
    const stored = localStorage.getItem('isLoggedIn');
    return stored ? JSON.parse(stored) : false;
  }

  setPatientId(id: number | null): void {
    this.patientId = id;
    if (id === null) {
      localStorage.removeItem('patientId');
    } else {
      localStorage.setItem('patientId', id.toString());
    }
  }

  getPatientId(): number | null {
    const stored = localStorage.getItem('patientId');
    return stored ? parseInt(stored, 10) : null;
  }

  setUserId(userId: number | null): void {
    if (userId === null) {
      localStorage.removeItem('userId');
    } else {
      localStorage.setItem('userId', userId.toString());
    }
  }

  getUserId(): number | null {
    const stored = localStorage.getItem('userId');
    return stored ? parseInt(stored, 10) : null;
  }

  setUserRole(role: string | null): void {
    this.userRole = role;
    if (role === null) {
      localStorage.removeItem('userRole');
    } else {
      localStorage.setItem('userRole', role);
    }
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  logout(): void {
    this.loggedIn = false;
    this.patientId = null;
    this.userRole = null;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('patientId');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
  }
}



// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private loggedIn = false;
//   private patientId: number | null = null;
//   private userRole: string | null = null;

//   // Set login status
//   setLoginStatus(status: boolean): void {
//     this.loggedIn = status;
//     localStorage.setItem('isLoggedIn', JSON.stringify(status));
//   }

//   // Get login status
//   isLoggedIn(): boolean {
//     const stored = localStorage.getItem('isLoggedIn');
//     return stored ? JSON.parse(stored) : false;
//   }

//   // Set patient ID
//   setPatientId(id: number): void {
//     this.patientId = id;
//     localStorage.setItem('patientId', id.toString());
//   }

//   // Get patient ID
//   getPatientId(): number | null {
//     const stored = localStorage.getItem('patientId');
//     return stored ? parseInt(stored, 10) : null;
//   }

//   setUserId(userId: number): void {
//     localStorage.setItem('userId', userId.toString());
//   }
  


  // // Set user role
  // setUserRole(role: string): void {
  //   this.userRole = role;
  //   localStorage.setItem('userRole', role);
  // }

  // // Get user role
  // getUserRole(): string | null {
  //   return localStorage.getItem('userRole');
  // }

//   setUserRole(role: string): void {
//     localStorage.setItem('userRole', role);
//   }
  
//   getUserRole(): string | null {
//     return localStorage.getItem('userRole');
//   }
  
//   getUserId(): number | null {
//     return Number(localStorage.getItem('userId'));
//   }
  

//   // Logout and clear all stored data
//   logout(): void {
//     this.loggedIn = false;
//     this.patientId = null;
//     this.userRole = null;
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('patientId');
//     localStorage.removeItem('userRole');
//   }
// }
