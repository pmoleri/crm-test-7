import { IgrActionStrip, IgrActionStripModule, IgrCellTemplateContext, IgrColumn, IgrGrid, IgrGridBaseDirective, IgrGridEditDoneEventArgs, IgrGridEditingActions, IgrGridModule, IgrGridPinningActions, IgrGridToolbar, IgrGridToolbarActions, IgrGridToolbarAdvancedFiltering, IgrGridToolbarTitle, IgrPaginator, IgrPaginatorModule, IgrRowDataEventArgs } from 'igniteui-react-grids';
import { IgrAvatar, IgrAvatarModule, IgrButton, IgrButtonModule, IgrDialog, IgrDialogModule, IgrInput, IgrInputModule, IgrRipple, IgrRippleModule, IgrSelect, IgrSelectItem, IgrSelectModule, IgrSnackbar, IgrSnackbarModule } from 'igniteui-react';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { CustomerDto } from '../models/NorthwindSwagger/customer-dto';
import { deleteCustomerDto, getCustomerDto, postCustomerDto } from '../services/northwind-swagger';
import { formDataToObject } from '../utils/form-utils';
import { useGetCustomerDtoPagedResultDto } from '../hooks/northwind-swagger-hooks';
import 'igniteui-react-grids/grids/combined.js';
import styles from './accounts.module.css';
import createClassTransformer from '../style-utils';
import '/src/app/base-view-styles.css';

export default function Accounts() {
  const classes = createClassTransformer(styles);
  const navigate = useNavigate();
  const form = useRef<HTMLFormElement>(null);
  const newAccountDialog = useRef<IgrDialog>(null);
  const snackbarsuccess = useRef<IgrSnackbar>(null);
  const snackbarerror = useRef<IgrSnackbar>(null);
  const [grid_Page_Index, setGrid_Page_Index] = useState<number | undefined>(0);
  const [grid_Page_Size, setGrid_Page_Size] = useState<number | undefined>(20);
  const [_selectedCustomer, setSelectedCustomer] = useState<CustomerDto | undefined>();
  const [value, setValue] = useState<string | undefined>('2');
  const [value1, setValue1] = useState<string | undefined>('1');
  const { northwindSwaggerCustomerDtoPagedResultDto: grid_Data_Request } = useGetCustomerDtoPagedResultDto(grid_Page_Index as any, grid_Page_Size as any, '');

  async function rowAddedGrid(e: IgrRowDataEventArgs) {
    await postCustomerDto(e.detail.data);
  }
  async function rowDeletedGrid(e: IgrRowDataEventArgs) {
    await deleteCustomerDto(e.detail.rowKey?.customerId);
  }
  async function rowEditDoneGrid(e: IgrGridEditDoneEventArgs) {
    if (!e.detail.isAddRow) {
      await getCustomerDto(e.detail.rowData?.customerId, e.detail.rowData);
    }
  }
  async function submitCustomerDto(args: React.FormEvent<HTMLFormElement>) {
    args.preventDefault();
    const value = formDataToObject(args.target as HTMLFormElement);
    await postCustomerDto(value);
  }
  function clickButton2() {
    form.current?.submit();
    newAccountDialog.current?.toggle();
    setGrid_Page_Index(parseFloat('0'));
  }

  const columnBodyTemplate = (ctx: { dataContext: IgrCellTemplateContext }) => {
    return (
      <>
        <a href="" onClick={() => navigate(`/account-detail/AROUT`)} className={classes("typography__body-2 hyperlink")}>
          <span>{ctx.dataContext.cell.value}</span>
        </a>
      </>
    )
  }

  return (
    <>
      <div className={classes("row-layout accounts-container")}>
        <div className={classes("row-layout group")}>
          <div className={classes("column-layout group_1")}>
            <div className={classes("column-layout group_2")}>
              <div className={classes("row-layout header")}>
                <div className={classes("row-layout page-title")}>
                  <IgrAvatar shape="rounded" className={classes("avatar")}>
                    <span className={classes("material-icons icon")}>
                      <span>apartment</span>
                    </span>
                  </IgrAvatar>
                  <h6 className={classes("h6")}>
                    <span>Accounts</span>
                  </h6>
                </div>
                <div className={classes("row-layout buttons")}>
                  <IgrButton type="button" onClick={() => newAccountDialog?.current?.toggle()} className={classes("button")}>
                    <span className={classes("material-icons")}>
                      <span>business</span>
                    </span>
                    <span>New Account</span>
                    <IgrRipple></IgrRipple>
                  </IgrButton>
                  <IgrButton variant="outlined" disabled type="button" className={classes("button")}>
                    <span className={classes("material-icons")}>
                      <span>search</span>
                    </span>
                    <span>Discover companies</span>
                    <IgrRipple></IgrRipple>
                  </IgrButton>
                  <IgrButton variant="outlined" disabled type="button" className={classes("button")}>
                    <span className={classes("material-icons")}>
                      <span>import_export</span>
                    </span>
                    <span>Import</span>
                    <IgrRipple></IgrRipple>
                  </IgrButton>
                </div>
              </div>
            </div>
            <div className={classes("row-layout filters-and-sorting")}>
              <div className={classes("row-layout group_3")}>
                <IgrSelect outlined={false} value={value} onChange={(e) => setValue(e.detail.value)} className={classes("user-input")}>
                  <IgrSelectItem value="1" key="f20a1b46-336b-447f-b49c-a385e30139c0">
                    <span>My Accounts</span>
                  </IgrSelectItem>
                  <IgrSelectItem value="2" key="c985fd39-e817-48c4-8cd0-9cfda96b9785">
                    <span>All Accounts</span>
                  </IgrSelectItem>
                </IgrSelect>
                <IgrInput type="Search" placeholder="Search accounts" outlined={true} className={classes("user-input")}>
                  <span slot="prefix">
                    <span className={classes("material-icons icon_1")}>
                      <span>search</span>
                    </span>
                  </span>
                </IgrInput>
              </div>
              <IgrSelect outlined={true} value={value1} onChange={(e) => setValue1(e.detail.value)} className={classes("user-input")}>
                <IgrSelectItem value="1" key="afcff6b5-b50d-4c5b-b0f9-a7df5bf5be7a">
                  <span>Recently updated</span>
                </IgrSelectItem>
                <IgrSelectItem value="2" key="5b7af63b-3a3d-44ca-bc41-9df27ec27ddb">
                  <span>Name</span>
                </IgrSelectItem>
              </IgrSelect>
            </div>
            <IgrGrid data={grid_Data_Request?.items} primaryKey="customerId" rowSelection="single" hideRowSelectors={true} rowEditable={true} pagingMode="Remote" allowFiltering={true} filterMode="excelStyleFilter" onRowAdded={rowAddedGrid} onRowDeleted={rowDeletedGrid} onRowEditDone={rowEditDoneGrid} onRowSelectionChanging={(e) => setSelectedCustomer(e.detail.newSelection[0])} className={classes("ig-typography ig-scrollbar grid")}>
              <IgrGridToolbar>
                <IgrGridToolbarActions>
                  <IgrGridToolbarAdvancedFiltering></IgrGridToolbarAdvancedFiltering>
                </IgrGridToolbarActions>
                <IgrGridToolbarTitle>
                  <span>Grid Toolbar</span>
                </IgrGridToolbarTitle>
              </IgrGridToolbar>
              <IgrPaginator perPage={grid_Page_Size} totalRecords={grid_Data_Request?.totalRecordsCount} page={grid_Page_Index} onPerPageChange={(e) => setGrid_Page_Size(e.detail)} onPageChange={(e) => setGrid_Page_Index(e.detail)}></IgrPaginator>
              <IgrColumn field="customerId" dataType="string" header="customerId" groupable={true} sortable={true} onBodyTemplate={columnBodyTemplate} selectable={false}></IgrColumn>
              <IgrColumn field="companyName" dataType="string" header="companyName" groupable={true} sortable={true} selectable={false}></IgrColumn>
              <IgrColumn field="contactName" dataType="string" header="contactName" groupable={true} sortable={true} selectable={false}></IgrColumn>
              <IgrColumn field="contactTitle" dataType="string" header="contactTitle" groupable={true} sortable={true} selectable={false}></IgrColumn>
              <IgrColumn field="address.street" dataType="string" header="address street" groupable={true} sortable={true} selectable={false}></IgrColumn>
              <IgrColumn field="address.city" dataType="string" header="address city" groupable={true} sortable={true} selectable={false}></IgrColumn>
              <IgrColumn field="address.region" dataType="string" header="address region" groupable={true} sortable={true} selectable={false}></IgrColumn>
              <IgrColumn field="address.postalCode" dataType="string" header="address postalCode" groupable={true} sortable={true} selectable={false}></IgrColumn>
              <IgrColumn field="address.country" dataType="string" header="address country" groupable={true} sortable={true} selectable={false}></IgrColumn>
              <IgrColumn field="address.phone" dataType="string" header="address phone" groupable={true} sortable={true} selectable={false}></IgrColumn>
              <IgrActionStrip>
                <IgrGridPinningActions></IgrGridPinningActions>
                <IgrGridEditingActions addRow={true}></IgrGridEditingActions>
              </IgrActionStrip>
            </IgrGrid>
          </div>
        </div>
        <IgrDialog closeOnOutsideClick={true} ref={newAccountDialog}>
          <h5 slot="title">
            <span>New Account</span>
          </h5>
          <form onSubmit={submitCustomerDto} ref={form} className={classes("column-layout form")}>
            <div className={classes("column-layout form_fields")}>
              <IgrInput label="Company name" required outlined={true} minLength={0} maxLength={100} name="companyName">
                <p slot="value-missing">This field is required</p>
                <p slot="too-short">Entry should be at least 0 character(s) long</p>
                <p slot="too-long">Entry should be no more than 100 character(s) long</p>
              </IgrInput>
              <IgrInput label="Country" required outlined={true} minLength={0} maxLength={50} name="address.country">
                <p slot="value-missing">This field is required</p>
                <p slot="too-short">Entry should be at least 0 character(s) long</p>
                <p slot="too-long">Entry should be no more than 50 character(s) long</p>
              </IgrInput>
              <IgrInput label="Contact name" outlined={true} minLength={0} maxLength={50} name="contactName">
                <p slot="too-short">Entry should be at least 0 character(s) long</p>
                <p slot="too-long">Entry should be no more than 50 character(s) long</p>
              </IgrInput>
              <IgrInput label="Contact title" outlined={true} minLength={0} maxLength={50} name="contactTitle">
                <p slot="too-short">Entry should be at least 0 character(s) long</p>
                <p slot="too-long">Entry should be no more than 50 character(s) long</p>
              </IgrInput>
              <IgrInput label="Street" outlined={true} minLength={0} maxLength={100} name="address.street">
                <p slot="too-short">Entry should be at least 0 character(s) long</p>
                <p slot="too-long">Entry should be no more than 100 character(s) long</p>
              </IgrInput>
              <IgrInput label="City" outlined={true} minLength={0} maxLength={50} name="address.city">
                <p slot="too-short">Entry should be at least 0 character(s) long</p>
                <p slot="too-long">Entry should be no more than 50 character(s) long</p>
              </IgrInput>
              <div className={classes("row-layout group_4")}>
                <IgrInput label="Region" outlined={true} minLength={0} maxLength={50} name="address.region" className={classes("input")}>
                  <p slot="too-short">Entry should be at least 0 character(s) long</p>
                  <p slot="too-long">Entry should be no more than 50 character(s) long</p>
                </IgrInput>
                <IgrInput label="Postal code" outlined={true} minLength={0} maxLength={20} name="address.postalCode" className={classes("input")}>
                  <p slot="too-short">Entry should be at least 0 character(s) long</p>
                  <p slot="too-long">Entry should be no more than 20 character(s) long</p>
                </IgrInput>
              </div>
              <IgrInput label="Phone" outlined={true} pattern="^\+?[1-9]\d{1,14}$" name="address.phone">
                <p slot="pattern-mismatch">Entry does not match the required pattern</p>
              </IgrInput>
            </div>
            <IgrSnackbar actionText="OK" onAction={() => snackbarsuccess?.current?.toggle()} ref={snackbarsuccess}>
              <span>Your new submission was saved successfully!</span>
            </IgrSnackbar>
            <IgrSnackbar actionText="OK" onAction={() => snackbarerror?.current?.toggle()} ref={snackbarerror}>
              <span>Uh-oh! Something went wrong.</span>
            </IgrSnackbar>
          </form>
          <div slot="footer">
            <IgrButton variant="outlined" type="button" onClick={() => newAccountDialog?.current?.toggle()} className={classes("button_1")}>
              <span>Cancel</span>
              <IgrRipple></IgrRipple>
            </IgrButton>
            <IgrButton type="submit" onClick={clickButton2} className={classes("button_1")}>
              <span>Add</span>
              <IgrRipple></IgrRipple>
            </IgrButton>
          </div>
        </IgrDialog>
      </div>
    </>
  );
}
