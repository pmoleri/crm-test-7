import { IgrIconButton, IgrIconButtonModule, IgrNavbar, IgrNavbarModule, IgrNavDrawer, IgrNavDrawerItem, IgrNavDrawerModule, IgrRipple, IgrRippleModule } from 'igniteui-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import styles from './app.module.css';
import createClassTransformer from './style-utils';
import '/src/app/base-view-styles.css';

export default function App() {
  const classes = createClassTransformer(styles);
  const navigate = useNavigate();
  const navDrawer = useRef<IgrNavDrawer>(null);

  return (
    <>
      <div className={classes("column-layout master-view-container")}>
        <div className={classes("row-layout group")}>
          <div onClick={() => navDrawer?.current?.toggle()} className={classes("row-layout group_1")}>
            <span className={classes("material-icons icon")}>
              <span>menu</span>
            </span>
          </div>
          <IgrNavbar className={classes("navbar")}>
            <div className={classes("row-layout group_2")}>
              <img src="/src/assets/CRM%20Logo.svg" className={classes("image")} />
            </div>
            <div style={{display: 'contents'}} slot="end">
              <IgrIconButton className={classes("icon-button")}>
                <span className={classes("material-icons icon_1")}>
                  <span>search</span>
                </span>
                <IgrRipple></IgrRipple>
              </IgrIconButton>
            </div>
            <div style={{display: 'contents'}} slot="end">
              <IgrIconButton className={classes("icon-button")}>
                <span className={classes("material-icons icon_1")}>
                  <span>settings</span>
                </span>
                <IgrRipple></IgrRipple>
              </IgrIconButton>
            </div>
            <div style={{display: 'contents'}} slot="end">
              <IgrIconButton className={classes("icon-button")}>
                <span className={classes("material-icons icon_1")}>
                  <span>notifications_none</span>
                </span>
                <IgrRipple></IgrRipple>
              </IgrIconButton>
            </div>
          </IgrNavbar>
        </div>
        <div className={classes("row-layout group_3")}>
          <IgrNavDrawer open={true} position="relative" ref={navDrawer} className={classes("nav-drawer")}>
            <IgrNavDrawerItem onClick={() => navigate(`/home`)}>
              <span slot="icon">
                <span className={classes("material-icons icon_2")}>
                  <span>home</span>
                </span>
                <IgrRipple></IgrRipple>
              </span>
              <div slot="content">Home</div>
            </IgrNavDrawerItem>
            <IgrNavDrawerItem onClick={() => navigate(`/accounts`)}>
              <span slot="icon">
                <span className={classes("material-icons icon_2")}>
                  <span>apartment</span>
                </span>
                <IgrRipple></IgrRipple>
              </span>
              <div slot="content">Accounts</div>
            </IgrNavDrawerItem>
            <IgrNavDrawerItem onClick={() => navigate(`/contacts`)}>
              <span slot="icon">
                <span className={classes("material-icons icon_2")}>
                  <span>account_circle</span>
                </span>
                <IgrRipple></IgrRipple>
              </span>
              <div slot="content">Contacts</div>
            </IgrNavDrawerItem>
            <IgrNavDrawerItem onClick={() => navigate(`/reports`)}>
              <span slot="icon">
                <span className={classes("material-icons icon_2")}>
                  <span>assignment</span>
                </span>
                <IgrRipple></IgrRipple>
              </span>
              <div slot="content">Reports</div>
            </IgrNavDrawerItem>
            <IgrNavDrawerItem onClick={() => navigate(`/calendar`)}>
              <span slot="icon">
                <span className={classes("material-icons icon_2")}>
                  <span>insert_chart</span>
                </span>
                <IgrRipple></IgrRipple>
              </span>
              <div slot="content">Calendar</div>
            </IgrNavDrawerItem>
            <IgrNavDrawerItem onClick={() => navigate(`/tasks`)}>
              <span slot="icon">
                <span className={classes("material-icons icon_2")}>
                  <span>task_alt</span>
                </span>
                <IgrRipple></IgrRipple>
              </span>
              <div slot="content">Tasks</div>
            </IgrNavDrawerItem>
          </IgrNavDrawer>
          <div className={classes("view-container")}>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
}
