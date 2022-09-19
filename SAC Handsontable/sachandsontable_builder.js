/*!
	SAC Handsontable Builder.js
*/

(function() {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
		<fieldset>
		<legend>SAC HandsonTable Properties</legend>
		<table>
			<tr>
				<td>Columns count</td>
				<td><input id="builder_columns_count" type="number" size="40" maxlength="10"></td>
			</tr>
			<tr>
				<td>Columns headers</td>
				<td><input id="builder_columns_headers" type="text" size="40"></td>
			</tr>
			<tr>
				<td>Columns types</td>
				<td><input id="builder_columns_types" type="text" size="40"></td>
			</tr>
		</table>
		<input type="submit" style="display:none;">
		</fieldset>
		</form>
		<style>
			:host {
			display: block;
			padding: 1em 1em 1em 1em;
			}
		</style>
		`;
	
	class SACHandsonTableBuilderPanel extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}
		
		_submit(e) {
				e.preventDefault();
				this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							colCount: this.colCount,
							colHeaders: this.colHeaders,
							colTypes: this.colTypes
						}
					}
				}));
		}
		
		set colCount(newColCount) {
			this._shadowRoot.getElementById("builder_columns_count").value = newColCount;
		}
		
		get colCount() {
			return this._shadowRoot.getElementById("builder_columns_count").value;
		}
		
		set colHeaders(newColHeaders) {
			this._shadowRoot.getElementById("builder_columns_headers").value = newColHeaders;
		}
		
		get colHeaders() {
			return this._shadowRoot.getElementById("builder_columns_headers").value.split(",");
		}
		
		set colTypes(newColTypes) {
			this._shadowRoot.getElementById("builder_columns_types").value = newColTypes;
		}
		
		get colTypes() {
			return this._shadowRoot.getElementById("builder_columns_types").value.split(",");
		}
	}
	
	customElements.define("com-sap-sample-sachandsontable-builder", SACHandsonTableBuilderPanel);
})();
