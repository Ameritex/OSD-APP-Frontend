import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {UploadComponent} from '@pages/upload/upload.component';
import {JobTravellerComponent} from '@pages/job-traveller/job-traveller.component';
import {SearchJobTravellerComponent} from '@pages/search-job-traveller/search-job-traveller.component';
import {OrderAnalysisReportComponent} from '@pages/order-analysis-report/order-analysis-report.component';
import {ReportsComponent} from '@pages/reports/reports.component';
import {BOMComponent} from '@pages/bom/bom.component';

import {AuditComponent} from '@pages/audit/audit.component';
import {UserActivityComponent} from '@pages/user-activity/user-activity.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {PrivacyPolicyComponent} from '@modules/privacy-policy/privacy-policy.component';
import { MissingOsdComponent } from '@pages/missing-osd/missing-osd.component';
import { PrintJobComponent } from '@pages/print-job/print-job.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        //canActivate: [AuthGuard],
        //canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'upload',
                component: UploadComponent,
            },
            {
                path: 'job-traveller',
                component: JobTravellerComponent,
            },
            {
                path: 'search-job-traveller',
                component: SearchJobTravellerComponent,
            },
            {
                path: 'reports',
                component:ReportsComponent,
            },
            {
                path: 'bom',
                component:BOMComponent,
            },
            {
                path: 'order-analysis-report',
                component: OrderAnalysisReportComponent,
            },
            {
                path: 'audit',
                component: AuditComponent,
            },
            {
                path: 'user-activity',
                component: UserActivityComponent,
            },
            {
                path: 'missing-osd',
                component: MissingOsdComponent
            },
            {
                path: 'print-job',
                component: PrintJobComponent
            },
            {
                path: '',
                component: DashboardComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
