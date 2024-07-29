/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  GridApi,
  GridOptions,
  IServerSideDatasource,
  IServerSideGetRowsRequest,
  RowModelType
} from 'ag-grid-community';

@Component({
  selector: 'app-volume-managemet',
  templateUrl: './volume-managemet.component.html',
  styleUrl: './volume-managemet.component.scss'
})
export class VolumeManagemetComponent {
  public gridOptions: any;
  public columnDefs: any[];
  public defaultColDef: any;
  public autoGroupColumnDef: any;
  public gridApi: GridApi | undefined;
  rowData: any[] | undefined;
  public rowBuffer = 0;
  public rowModelType: RowModelType = 'serverSide';
  public cacheBlockSize = 50;
  public maxBlocksInCache = 2;
  public themeClass: string = 'ag-theme-quartz';
  constructor(private http: HttpClient) {
    this.gridOptions = <GridOptions>{
      rowModelType: 'serverSide', // Use server-side row model
      paginationPageSize: 10
    };

    this.columnDefs = [
      {
        headerName: 'Info',
        children: [
          {
            headerName: 'Plant',
            columnGroupShow: 'open',
            field: `info.plant`,
            lockPosition: 'left',
            rowGroup: true,
            hide: true
          },
          {
            headerName: 'LP',
            columnGroupShow: 'open',
            field: `info.lp`,
            lockPosition: 'left',
            rowGroup: true,
            hide: true
          },
          {
            headerName: 'Derivative',
            columnGroupShow: 'open',
            field: `info.derivative`,
            lockPosition: 'left',
            rowGroup: true,
            hide: true
          },
          {
            headerName: 'Model Codes',
            columnGroupShow: 'open',
            field: `info.modelCodes`,
            lockPosition: 'left',
            rowGroup: true,
            hide: true
          },
          {
            headerName: 'Product Structure',
            columnGroupShow: 'open',
            field: `info.productStructure`,
            lockPosition: 'left',
            rowGroup: true,
            hide: true
          },
          {
            headerName: 'Geostructure',
            columnGroupShow: 'open',
            field: `info.geostructure`,
            lockPosition: 'left',
            rowGroup: true,
            hide: true
          }
        ]
      },
      {
        headerName: 'PW 24 July 2024',
        children: [
          {
            headerName: 'UL',
            field: `july24.ul`,
            aggFunc: 'sum',
            editable: false,
            cellStyle: (params: any) => this.cellStyle(params)
          },
          {
            headerName: 'Delta UL',
            field: `july24.diffUL`,
            aggFunc: 'sum'
          },
          {
            headerName: 'Plan',
            columnGroupShow: 'closed',
            field: `july24.plan`,
            aggFunc: 'sum'
          },
          {
            headerName: 'Delta Plan',
            columnGroupShow: 'closed',
            field: `july24.diffPlan`,
            aggFunc: 'sum'
          },
          {
            headerName: 'Order 11/12',
            columnGroupShow: 'closed',
            field: `july24.status11by12`,
            aggFunc: 'sum'
          },
          {
            headerName: 'Order 50',
            columnGroupShow: 'closed',
            field: `july24.status50`,
            aggFunc: 'sum'
          }
        ]
      },
      {
        headerName: 'PW 25 July 2024',
        children: [
          {
            headerName: 'UL',
            field: `july25.ul`,
            aggFunc: 'sum',
            editable: false,
            cellStyle: (params: any) => this.cellStyle(params)
          },
          {
            headerName: 'Delta UL',
            field: `july25.diffUL`,
            aggFunc: 'sum'
          },
          {
            headerName: 'Plan',
            columnGroupShow: 'closed',
            field: `july25.plan`,
            aggFunc: 'sum'
          },
          {
            headerName: 'Delta Plan',
            columnGroupShow: 'closed',
            field: `july25.diffPlan`,
            aggFunc: 'sum'
          },
          {
            headerName: 'Order 11/12',
            columnGroupShow: 'closed',
            field: `july25.status11by12`,
            aggFunc: 'sum'
          },
          {
            headerName: 'Order 50',
            columnGroupShow: 'closed',
            field: `july25.status50`,
            aggFunc: 'sum'
          }
        ]
      },
      {
        headerName: 'PW 26 July 2024',
        children: [
          {
            headerName: 'UL',
            field: `july26.ul`,
            aggFunc: 'sum',
            editable: false,
            cellStyle: (params: any) => this.cellStyle(params)
          },
          {
            headerName: 'Delta UL',
            field: `july26.diffUL`,
            aggFunc: 'sum'
          },
          {
            headerName: 'Plan',
            columnGroupShow: 'closed',
            field: `july26.plan`,
            aggFunc: 'sum'
          },
          {
            headerName: 'Delta Plan',
            columnGroupShow: 'closed',
            field: `july26.diffPlan`,
            aggFunc: 'sum'
          },
          {
            headerName: 'Order 11/12',
            columnGroupShow: 'closed',
            field: `july26.status11by12`,
            aggFunc: 'sum'
          },
          {
            headerName: 'Order 50',
            columnGroupShow: 'closed',
            field: `july26.status50`,
            aggFunc: 'sum'
          }
        ]
      }
    ];

    this.defaultColDef = {
      flex: 1,
      minWidth: 120,
      resizable: true,
      editable: false
    };

    this.autoGroupColumnDef = {
      headerValueGetter: (params: any) => `${params.colDef.headerName}`,
      minWidth: 120,
      maxWidth: 150,
      cellRendererParams: {
        suppressCount: false,
        checkbox: false,
        sorting: false
      },
      pinned: 'left'
    };
  }

  onGridReady(params: any) {
    this.http
      .get<any[]>(`${'http://localhost:8080/api/json'}`)
      .subscribe(data => {
        // setup the fake server with entire dataset
        const fakeServer = createFakeServer(data);
        // create datasource with a reference to the fake server
        const datasource = createServerSideDatasource(fakeServer);
        // register the datasource with the grid
        params.api!.setGridOption('serverSideDatasource', datasource);
      });
  }

  search() {
    this.http.get('http://localhost:8080/api/json').subscribe(data => {
      console.log(data);
    });
  }

  expandAll() {
    this.gridApi?.forEachNode(node => {
      if (node.group) {
        node.setExpanded(true);
      }
    });
  }

  colapseAll() {
    this.gridApi?.forEachNode(node => {
      if (node.group) {
        node.setExpanded(false);
      }
    });
  }

  updateColumnDefs(editable: boolean) {
    const updateEditable: any = (cols: any[]) => {
      return cols.map(col => {
        if (col.children) {
          return {
            ...col,
            children: updateEditable(col.children)
          };
        }
        return { ...col, editable };
      });
    };
    this.columnDefs = updateEditable(this.columnDefs);
    this.gridOptions = {
      ...this.gridOptions,
      columnDefs: this.columnDefs
    };
    this.gridApi?.setGridOption('columnDefs', this.columnDefs);
    this.gridApi?.refreshCells({ force: true });
  }

  enableEditing() {
    this.updateColumnDefs(true);
  }

  disableEditing() {
    this.updateColumnDefs(false);
  }

  cellStyle(params: any) {
    if (params && params.node && !params.node.group) {
      // Customize cell style based on edit state
      if (params && params.node && params.node.editable) {
        // Cell is being edited
        return { color: 'red' };
      } else if (params && params.node && params.node.edited) {
        // Cell value has changed
        return { color: 'yellow' };
      } else if (params && params.node && params.node.dirty) {
        // Cell value has changed
        return { color: 'lightgreen' };
      }
    }
    return { color: 'black' };
  }

  onCellValueChanged(params: any) {
    if (params && params.node) {
      // Check if cell value has changed
      if (params.oldValue !== params.newValue) {
        // Mark node as edited and dirty
        params.node.setDataValue('edited', true);
        params.node.setDataValue('dirty', true);
      } else {
        // Reset edited and dirty states
        params.node.setDataValue('edited', false);
        params.node.setDataValue('dirty', false);
      }
      // Refresh the cell to apply styles
      this.gridApi?.refreshCells({ rowNodes: [params.node], force: true });
    }
  }
}

function createServerSideDatasource(server: any): IServerSideDatasource {
  return {
    getRows: params => {
      console.log('[Datasource] - rows requested by grid: ', params.request);
      // get data for request from our fake server
      const response = server.getData(params.request);
      // simulating real server call with a 500ms delay
      setTimeout(() => {
        if (response.success) {
          // supply rows for requested block to grid
          params.success({ rowData: response.rows });
        } else {
          params.fail();
        }
      }, 500);
    }
  };
}

function createFakeServer(allData: any[]) {
  return {
    getData: (request: IServerSideGetRowsRequest) => {
      // in this simplified fake server all rows are contained in an array
      const requestedRows = allData.slice(request.startRow, request.endRow);
      return {
        success: true,
        rows: requestedRows
      };
    }
  };
}
