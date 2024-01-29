/*!
	SAC AG-Grid.js
*/

var getScriptPromisify = (src) => {
    return new Promise(resolve => {
      $.getScript(src, resolve)
    })
  }

(function () {
    const template = document.createElement('template');
    template.innerHTML = `
	<style>
    :host {
		font-size: 14px;
		font-family: arial;
		font-color: #346187;
		overflow: overlay;
    }
	</style>
    <div id="main_grid" width="100%">
    </div>
    `;

    class SACAGGrid extends HTMLElement{
		
		
		
        constructor(){
            console.log("constructor call");
			super();

            //HTML objects
            let shadowRoot = this.attachShadow({mode:'open'});
            shadowRoot.appendChild(template.content.cloneNode(true));
    
            this._props = {};
			
			this.hgrid = null;
			this.data = null;
			this.columns = null;
			this.rowids = null;
        }
		
		// loadWidget
		async loadWidget() {
			
			await getScriptPromisify('https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.js');
			
			var grid_elt = this.shadowRoot.getElementById('main_grid');
			
			const grid_options = {
				columnDefs: [
							// using default ColDef
							{ field: 'A' },
							{ field: 'B' },
							{ field: 'C' },
							{ field: 'D' },
							{ field: 'E' }
				],
							
				// default ColDef, gets applied to every column
				defaultColDef: {
					// set the default column width
					width: 150,
					// make every column editable
					editable: true,
					// make every column use 'text' filter by default
					filter: 'agTextColumnFilter',
					// enable floating filters by default
					floatingFilter: true,
					// disable cell data types
					cellDataType: false,
				},
				
				rowData: [
							{Id:1, A:'', B:'', C:'', D:'', E:''},
							{Id:2, A:'', B:'', C:'', D:'', E:''},
							{Id:3, A:'', B:'', C:'', D:'', E:''},
							{Id:4, A:'', B:'', C:'', D:'', E:''},
							{Id:5, A:'', B:'', C:'', D:'', E:''},
							{Id:6, A:'', B:'', C:'', D:'', E:''},
							{Id:7, A:'', B:'', C:'', D:'', E:''},
							{Id:8, A:'', B:'', C:'', D:'', E:''},
							{Id:9, A:'', B:'', C:'', D:'', E:''},
							{Id:10, A:'', B:'', C:'', D:'', E:''}
				]
			};
						
			// Destroy any existing grid instance
			if(this.hgrid !== null) {
				if (!this.hgrid.isDestroyed()) {
					this.hgrid.destroy();
				}
			}
			
			this.hgrid = agGrid.createGrid(grid_elt, grid_options);
		}
		
		// reloadWidget with new options
		async reloadWidget(options) {
			if(this.hgrid !== null) {
				this.hgrid.updateGridOptions(options);
			}
		}

		// SAC custom widget events handlers
        onCustomWidgetBeforeUpdate(changedProperties) {
			console.log("onCustomWidgetBeforeUpdate call");
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			console.log("onCustomWidgetAfterUpdate call");
			console.log(changedProperties);
			
			// TODO
			
			if(this.hgrid === null) {
				this.loadWidget();
			}
			else {
				// TODO
				this.reloadWidget({});
			}
		}
		
		connectedCallback(){
			console.log("connectedCallback call");
		}
		
		
		// Setters & Getters
		
		// Data setter/getter
		setData(value) {
			this.data = value;
			this.reloadWidget({ rowData: this.data });
		}
		
		getData() {
			if (this.hgrid !== null) {
				
				let src_data = "[";
				
				this.hgrid.forEachNode((rowNode, index) => {
					tbl_row = "{";
					
					console.log('Row ' + rowNode.data + ' is in the grid');
					
					tbl_row = tbl_row.concat("}");
					
					src_data = src_data.concat(tbl_row);
				});
				
				src_data = src_data.concat("]");
					
				this.data = JSON.parse(src_data);
			}
			
			return this.data;
		}
		
		// Columns setter/getter
		setColumns(value) {
			this.columns = value;
			this.reloadWidget({ columnsDefs: this.columns });
		}
		
		getColumns() {
			if (this.hgrid !== null) {
				
				let src_cols = "[";
				
				let cols = getAllGridColumns();
				
				cols.forEach((col) => {
				
					col_val = "{";
					
					col_val.concat("\"field\":").concat(col.field);
					
					col_val = col_val.concat("}");
					
					src_cols = src_cols.concat(col_val);
				});
				
				src_cols = src_cols.concat("]");
					
				this.columns = JSON.parse(src_cols);
			}
			
			return this.data;
		}
		
		// RowsId setter/getter
		setRowsId(field) {
			this.reloadWidget({ getRowId: rows => rows.data.field });
		}
		
		getRowIds() {
			if (this.hgrid !== null) {
				
				let src_data = "[";
				
				this.hgrid.forEachNode((rowNode, index) => {
					tbl_row = "{";
					
					tbl_row.concat("\"id\":").concat(rowNode.data.id);
					
					tbl_row = tbl_row.concat("}");
					src_data = src_data.concat(tbl_row);
				});
				
				src_data = src_data.concat("]");
					
				this.rowids = JSON.parse(src_data);
			}
			
			return this.rowids;
		}
		
		// Custom events handlers
        // afterOnCellCornerMouseDown
		/*
		afterOnCellCornerMouseDownHandler (evt) {
			console.log("afterOnCellCornerMouseDown triggered");
		}
		*/
    }

    window.customElements.define('com-sap-sample-sacaggrid', SACAGGrid);
})()
