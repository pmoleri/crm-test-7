import { IgrAccordion, IgrAccordionModule, IgrAvatar, IgrAvatarModule, IgrButton, IgrButtonModule, IgrCheckbox, IgrCheckboxModule, IgrChip, IgrChipModule, IgrExpansionPanel, IgrExpansionPanelModule, IgrList, IgrListItem, IgrListModule, IgrRipple, IgrRippleModule, IgrTab, IgrTabPanel, IgrTabs, IgrTabsModule } from 'igniteui-react';
import { IgrColumn, IgrGrid, IgrGridModule, IgrGridToolbar, IgrGridToolbarTitle } from 'igniteui-react-grids';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { OrderDto } from '../models/NorthwindSwagger/order-dto';
import { useGetCustomerDto, useGetOrderDtoList, useGetProductDtoList } from '../hooks/northwind-swagger-hooks';
import 'igniteui-react-grids/grids/combined.js';
import styles from './account-detail.module.css';
import createClassTransformer from '../style-utils';
import '/src/app/base-view-styles.css';

export default function AccountDetail() {
  const classes = createClassTransformer(styles);
  const navigate = useNavigate();
  const routeParams = useParams();
  const rCustomerID = routeParams.rCustomerID ?? 'AROUT';
  const __loaded = useRef<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderDto | undefined>();
  const { northwindSwaggerCustomerDto: selectedCustomer1 } = useGetCustomerDto('', undefined);
  const { northwindSwaggerOrderDto } = useGetOrderDtoList(rCustomerID);
  const { northwindSwaggerProductDto } = useGetProductDtoList(selectedOrder?.orderId as any);

  useEffect(() => {
    if (__loaded.current) {
      setSelectedOrder(undefined);
    }
  }, [selectedCustomer1]);

  useEffect(() => {
    __loaded.current = true;
    return () => {
      __loaded.current = false;
    }
  }, []);

  return (
    <>
      <div className={classes("column-layout account-detail-container")}>
        <div className={classes("column-layout group")}>
          <IgrButton variant="flat" type="button" onClick={() => navigate(`/accounts`)} className={classes("button")}>
            <span className={classes("material-icons")}>
              <span>arrow_back</span>
            </span>
            <span>All accounts</span>
            <IgrRipple></IgrRipple>
          </IgrButton>
          <div className={classes("row-layout account-header")}>
            <div className={classes("row-layout page-title")}>
              <IgrAvatar shape="rounded" className={classes("avatar")}>
                <span className={classes("material-icons icon")}>
                  <span>apartment</span>
                </span>
              </IgrAvatar>
              <div className={classes("row-layout group_1")}>
                <h5 className={classes("content")}>
                  <span>{selectedCustomer1?.companyName}</span>
                </h5>
                <p className={classes("typography__body-1 text")}>
                  <span>{selectedCustomer1?.customerId}</span>
                </p>
              </div>
            </div>
            <div className={classes("row-layout group_2")}>
              <div className={classes("column-layout group_3")}>
                <p className={classes("typography__subtitle-2 content")}>
                  <span>Primary Contact</span>
                </p>
                <p className={classes("typography__body-1 text")}>
                  <span>{selectedCustomer1?.contactName}</span>
                </p>
                <p className={classes("typography__body-1 text")}>
                  <span>Sales Representative</span>
                </p>
              </div>
              <div className={classes("column-layout group_3")}>
                <p className={classes("typography__subtitle-2 content")}>
                  <span>Billing Address</span>
                </p>
                <p className={classes("typography__body-1 text")}>
                  <span>{selectedCustomer1?.address?.street}</span>
                </p>
                <div className={classes("column-layout group_4")}>
                  <div className={classes("row-layout group_5")}>
                    <p className={classes("typography__body-1 text")}>
                      <span>{selectedCustomer1?.address?.city}</span>
                    </p>
                    <p className={classes("typography__body-1 text")}>
                      <span>{selectedCustomer1?.address?.country}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className={classes("column-layout group_3")}>
                <p className={classes("typography__subtitle-2 content")}>
                  <span>Phone</span>
                </p>
                <p className={classes("typography__body-1 text")}>
                  <span>{selectedCustomer1?.address?.phone}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={classes("row-layout group_6")}>
          <div className={classes("column-layout group_7")}>
            <IgrTabs className={classes("tabs")}>
              <IgrTab selected={true}>
                <span>Sales</span>
              </IgrTab>
              <IgrTabPanel className={classes("column-layout tab-item-content")}>
                <IgrGrid data={northwindSwaggerOrderDto} primaryKey="orderId" rowSelection="single" hideRowSelectors={true} allowFiltering={true} filterMode="excelStyleFilter" onRowSelectionChanging={(e) => setSelectedOrder(e.detail.newSelection[0])} className={classes("ig-typography ig-scrollbar grid")}>
                  <IgrGridToolbar>
                    <IgrGridToolbarTitle>
                      <span>Orders</span>
                    </IgrGridToolbarTitle>
                  </IgrGridToolbar>
                  <IgrColumn field="orderId" dataType="number" header="orderId" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="shipVia" dataType="string" header="shipVia" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="shipperId" dataType="number" header="shipperId" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="orderDate" dataType="date" header="orderDate" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="requiredDate" dataType="date" header="requiredDate" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="freight" dataType="number" header="freight" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="completed" dataType="boolean" header="completed" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="shipAddress.street" dataType="string" header="shipAddress street" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="shipAddress.city" dataType="string" header="shipAddress city" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="shipAddress.region" dataType="string" header="shipAddress region" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="shipAddress.postalCode" dataType="string" header="shipAddress postalCode" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="shipAddress.country" dataType="string" header="shipAddress country" groupable={true} sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="shipAddress.phone" dataType="string" header="shipAddress phone" groupable={true} sortable={true} selectable={false}></IgrColumn>
                </IgrGrid>
                <IgrGrid data={northwindSwaggerProductDto} primaryKey="productId" allowFiltering={true} filterMode="excelStyleFilter" className={classes("ig-typography ig-scrollbar grid")}>
                  <IgrGridToolbar>
                    <IgrGridToolbarTitle>
                      <span>Order details</span>
                    </IgrGridToolbarTitle>
                  </IgrGridToolbar>
                  <IgrColumn field="productId" dataType="number" header="productId" sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="productName" dataType="string" header="productName" sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="supplierId" dataType="number" header="supplierId" sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="categoryId" dataType="number" header="categoryId" sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="quantityPerUnit" dataType="string" header="quantityPerUnit" sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="unitPrice" dataType="number" header="unitPrice" sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="unitsInStock" dataType="number" header="unitsInStock" sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="unitsOnOrder" dataType="number" header="unitsOnOrder" sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="reorderLevel" dataType="number" header="reorderLevel" sortable={true} selectable={false}></IgrColumn>
                  <IgrColumn field="discontinued" dataType="boolean" header="discontinued" sortable={true} selectable={false}></IgrColumn>
                </IgrGrid>
              </IgrTabPanel>
              <IgrTabPanel className={classes("column-layout tab-item-content")}>
                <div className={classes("row-layout buttons-1")}>
                  <IgrButton variant="outlined" type="button" className={classes("button_1")}>
                    <span className={classes("material-icons")}>
                      <span>person_add</span>
                    </span>
                    <span>Contact</span>
                    <IgrRipple></IgrRipple>
                  </IgrButton>
                  <IgrButton variant="outlined" type="button" className={classes("button_1")}>
                    <span className={classes("material-icons")}>
                      <span>star_border</span>
                    </span>
                    <span>New Opportunity</span>
                    <IgrRipple></IgrRipple>
                  </IgrButton>
                  <IgrButton variant="outlined" type="button" className={classes("button_1")}>
                    <span className={classes("material-icons")}>
                      <span>error_outline</span>
                    </span>
                    <span>New Case</span>
                    <IgrRipple></IgrRipple>
                  </IgrButton>
                  <IgrButton variant="outlined" type="button" className={classes("button_1")}>
                    <span className={classes("material-icons")}>
                      <span>note_add</span>
                    </span>
                    <span>Add note</span>
                    <IgrRipple></IgrRipple>
                  </IgrButton>
                  <IgrButton variant="outlined" type="button" className={classes("button_1")}>
                    <span className={classes("material-icons")}>
                      <span>file_copy</span>
                    </span>
                    <span>Add files</span>
                    <IgrRipple></IgrRipple>
                  </IgrButton>
                </div>
                <IgrAccordion singleExpand={true} className={classes("accordion")}>
                  <IgrExpansionPanel open={true} indicatorPosition="end">
                    <div className={classes("column-layout group_8")}>
                      <div className={classes("row-layout group_9")}>
                        <IgrAvatar initials="JL" shape="circle" className={classes("avatar_2")}></IgrAvatar>
                        <a href="" className={classes("typography__body-2 hyperlink")}>
                          <span>Janine Labrune</span>
                        </a>
                      </div>
                      <div className={classes("column-layout group_10")}>
                        <div className={classes("row-layout group_11")}>
                          <p className={classes("typography__subtitle-2 text_1")}>
                            <span>Account Name:</span>
                          </p>
                          <p className={classes("typography__body-2 text")}>
                            <span>Thomas Hardy</span>
                          </p>
                        </div>
                        <div className={classes("row-layout group_11")}>
                          <p className={classes("typography__subtitle-2 text_1")}>
                            <span>Title:</span>
                          </p>
                          <p className={classes("typography__body-2 text")}>
                            <span>Owner</span>
                          </p>
                        </div>
                        <div className={classes("row-layout group_12")}>
                          <p className={classes("typography__subtitle-2 text_1")}>
                            <span>Direct:</span>
                          </p>
                          <IgrCheckbox className={classes("checkbox")}></IgrCheckbox>
                        </div>
                      </div>
                    </div>
                    <span slot="title">Related Contacts (1)</span>
                  </IgrExpansionPanel>
                  <IgrExpansionPanel indicatorPosition="end">
                    <div className={classes("column-layout group_8")}>
                      <div className={classes("row-layout group_9")}>
                        <IgrAvatar src="/src/assets/Account-List-Avatar-Icon.svg" shape="rounded" className={classes("avatar_3")}></IgrAvatar>
                        <a href="" className={classes("typography__body-2 hyperlink")}>
                          <span>Around The Horn</span>
                        </a>
                      </div>
                      <div className={classes("column-layout group_10")}>
                        <div className={classes("row-layout group_11")}>
                          <p className={classes("typography__subtitle-2 text_1")}>
                            <span>Stage:</span>
                          </p>
                          <p className={classes("typography__body-2 text")}>
                            <span>Qualification</span>
                          </p>
                        </div>
                        <div className={classes("row-layout group_11")}>
                          <p className={classes("typography__subtitle-2 text_1")}>
                            <span>Amount:</span>
                          </p>
                          <p className={classes("typography__body-2 text")}>
                            <span>Owner</span>
                          </p>
                        </div>
                        <div className={classes("row-layout group_11")}>
                          <p className={classes("typography__subtitle-2 text_1")}>
                            <span>Close Date:</span>
                          </p>
                          <p className={classes("typography__body-2 text")}>
                            <span>9/12/2022</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <span slot="title">Opportunities (1)</span>
                  </IgrExpansionPanel>
                  <IgrExpansionPanel indicatorPosition="end">
                    <IgrList className={classes("list")}>
                      <IgrListItem>
                        <div slot="start">
                          <IgrAvatar shape="circle" className={classes("avatar_1 avatar_1_1")}>
                            <span className={classes("material-icons icon_1")}>
                              <span>insert_drive_file</span>
                            </span>
                          </IgrAvatar>
                        </div>
                        <div>
                          <a href="" className={classes("typography__body-2 hyperlink_1")}>
                            <span>Around-The-Horn-Contract-2022.docx</span>
                          </a>
                        </div>
                      </IgrListItem>
                      <IgrListItem>
                        <div slot="start">
                          <IgrAvatar shape="circle" className={classes("avatar_1 avatar_1_2")}>
                            <span className={classes("material-icons icon_1")}>
                              <span>insert_drive_file</span>
                            </span>
                          </IgrAvatar>
                        </div>
                        <div>
                          <a href="" className={classes("typography__body-2 hyperlink_1")}>
                            <span>Around-The-Horn-Contract-2021.docx</span>
                          </a>
                        </div>
                      </IgrListItem>
                    </IgrList>
                    <span slot="title">Contracts (2)</span>
                  </IgrExpansionPanel>
                  <IgrExpansionPanel indicatorPosition="end">
                    <p className={classes("typography__body-2 text_2")}>
                      <span>No cases filed.</span>
                    </p>
                    <span slot="title">Cases (0)</span>
                  </IgrExpansionPanel>
                  <IgrExpansionPanel indicatorPosition="end">
                    <p className={classes("typography__body-2 text_2")}>
                      <span>No notes added.</span>
                    </p>
                    <span slot="title">Notes (0)</span>
                  </IgrExpansionPanel>
                  <IgrExpansionPanel indicatorPosition="end">
                    <p className={classes("typography__body-2 text_2")}>
                      <span>No files uploaded</span>
                    </p>
                    <span slot="title">Files (0)</span>
                  </IgrExpansionPanel>
                </IgrAccordion>
              </IgrTabPanel>
              <IgrTab>
                <span className={classes("material-icons")}>
                  <span>info</span>
                </span>
                <span>Related</span>
              </IgrTab>
              <IgrTabPanel className={classes("row-layout tab-item-content_1")}>
                <div className={classes("row-layout demo-content")}>
                  <img src="/src/assets/start-building-dark.svg" className={classes("image")} />
                  <p className={classes("typography__body-2 text_3")}>
                    <span>Remove the "demo-content" container, and add your own content.</span>
                  </p>
                </div>
              </IgrTabPanel>
              <IgrTab disabled>
                <span className={classes("material-icons")}>
                  <span>info</span>
                </span>
                <span>Details</span>
              </IgrTab>
              <IgrTabPanel className={classes("row-layout tab-item-content_1")}>
                <div className={classes("row-layout demo-content-1")}>
                  <img src="/src/assets/start-building-dark.svg" className={classes("image")} />
                  <p className={classes("typography__body-2 text_3")}>
                    <span>Remove the "demo-content" container, and add your own content.</span>
                  </p>
                </div>
              </IgrTabPanel>
              <IgrTab disabled>
                <span className={classes("material-icons")}>
                  <span>info</span>
                </span>
                <span>News</span>
              </IgrTab>
            </IgrTabs>
          </div>
          <div className={classes("column-layout group_13")}>
            <IgrTabs className={classes("tabs")}>
              <IgrTabPanel className={classes("column-layout tab-item-content_2")}>
                <div className={classes("column-layout group_14")}>
                  <div className={classes("row-layout buttons")}>
                    <IgrButton variant="outlined" type="button" className={classes("button_1")}>
                      <span className={classes("material-icons")}>
                        <span>calendar_today</span>
                      </span>
                      <span>New Meeting</span>
                      <IgrRipple></IgrRipple>
                    </IgrButton>
                    <IgrButton variant="outlined" type="button" className={classes("button_1")}>
                      <span className={classes("material-icons")}>
                        <span>assignment</span>
                      </span>
                      <span>New task</span>
                      <IgrRipple></IgrRipple>
                    </IgrButton>
                    <IgrButton variant="outlined" type="button" className={classes("button_1")}>
                      <span className={classes("material-icons")}>
                        <span>call</span>
                      </span>
                      <span>Log a call</span>
                      <IgrRipple></IgrRipple>
                    </IgrButton>
                  </div>
                  <IgrAccordion singleExpand={true} className={classes("accordion")}>
                    <IgrExpansionPanel indicatorPosition="end">
                      <IgrList className={classes("list")}>
                        <IgrListItem>
                          <div slot="start">
                            <IgrAvatar src="/src/assets/Calendar-Avatar-Icon.svg" className={classes("avatar_1 avatar_1_3")}></IgrAvatar>
                          </div>
                          <div>
                            <div className={classes("column-layout group_15")}>
                              <div className={classes("row-layout group_16")}>
                                <p className={classes("typography__subtitle-2 text_4")}>
                                  <span>Project Intro</span>
                                </p>
                              </div>
                              <div className={classes("row-layout group_17")}>
                                <p className={classes("typography__caption text_2")}>
                                  <span>11/1/2022</span>
                                </p>
                                <p className={classes("typography__caption text_2")}>
                                  <span>-</span>
                                </p>
                                <p className={classes("typography__caption text_2")}>
                                  <span>10am</span>
                                </p>
                              </div>
                              <IgrChip className={classes("chip")}>
                                <span>Zoom Meeting</span>
                              </IgrChip>
                            </div>
                          </div>
                        </IgrListItem>
                        <IgrListItem>
                          <div slot="start">
                            <IgrAvatar src="/src/assets/Calendar-Avatar-Icon.svg" className={classes("avatar_1 avatar_1_4")}></IgrAvatar>
                          </div>
                          <div>
                            <div className={classes("column-layout group_15")}>
                              <div className={classes("row-layout group_16")}>
                                <p className={classes("typography__subtitle-2 text_4")}>
                                  <span>Sync Meeting</span>
                                </p>
                              </div>
                              <div className={classes("row-layout group_17")}>
                                <p className={classes("typography__caption text_2")}>
                                  <span>11/7/2022</span>
                                </p>
                                <p className={classes("typography__caption text_2")}>
                                  <span>-</span>
                                </p>
                                <p className={classes("typography__caption text_2")}>
                                  <span>2pm</span>
                                </p>
                              </div>
                              <IgrChip className={classes("chip")}>
                                <span>On Site Meeting</span>
                              </IgrChip>
                            </div>
                          </div>
                        </IgrListItem>
                        <IgrListItem>
                          <div slot="start">
                            <IgrAvatar src="/src/assets/Calendar-Avatar-Icon.svg" className={classes("avatar_1 avatar_1_5")}></IgrAvatar>
                          </div>
                          <div>
                            <div className={classes("column-layout group_15")}>
                              <div className={classes("row-layout group_16")}>
                                <p className={classes("typography__subtitle-2 text_4")}>
                                  <span>Wrap Up Meeting</span>
                                </p>
                              </div>
                              <div className={classes("row-layout group_17")}>
                                <p className={classes("typography__caption text_2")}>
                                  <span>11/14/2022</span>
                                </p>
                                <p className={classes("typography__caption text_2")}>
                                  <span>-</span>
                                </p>
                                <p className={classes("typography__caption text_2")}>
                                  <span>4pm</span>
                                </p>
                              </div>
                              <IgrChip className={classes("chip")}>
                                <span>Phone call</span>
                              </IgrChip>
                            </div>
                          </div>
                        </IgrListItem>
                      </IgrList>
                      <span slot="title">Upcoming Events (3)</span>
                    </IgrExpansionPanel>
                    <IgrExpansionPanel indicatorPosition="end">
                      <p className={classes("typography__body-2 text_2")}>
                        <span>No tasks added.</span>
                      </p>
                      <span slot="title">Tasks (0)</span>
                    </IgrExpansionPanel>
                    <IgrExpansionPanel indicatorPosition="end">
                      <p className={classes("typography__body-2 text_2")}>
                        <span>No call logged.</span>
                      </p>
                      <span slot="title">Call Logs (0)</span>
                    </IgrExpansionPanel>
                  </IgrAccordion>
                </div>
              </IgrTabPanel>
              <IgrTab selected={true}>
                <span className={classes("material-icons")}>
                  <span>info</span>
                </span>
                <span>Activity</span>
              </IgrTab>
              <IgrTabPanel className={classes("row-layout tab-item-content_3")}>
                <div className={classes("column-layout demo-content-1")}>
                  <img src="/src/assets/start-building-dark.svg" className={classes("image")} />
                  <p className={classes("typography__body-2 text_3")}>
                    <span>Remove the "demo-content" container, and add your own content.</span>
                  </p>
                </div>
              </IgrTabPanel>
              <IgrTab disabled>
                <span className={classes("material-icons")}>
                  <span>info</span>
                </span>
                <span>Conversations</span>
              </IgrTab>
            </IgrTabs>
          </div>
        </div>
      </div>
    </>
  );
}
