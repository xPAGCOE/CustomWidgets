/*!
	SAC Handsontable Styling.js
*/

(function() {
	let template = document.createElement("template");
	template.innerHTML = `
						<form id="form">
						<fieldset>
						<legend>SAC HandsonTable Properties</legend>
						<table>
						<tr>
							<td>Opacity</td>
							<td><input id="styling_opacity" type="text" size="5" maxlength="5"></td>
						</tr>
						</table>
						<input type="submit" style="display:none;">
						</fieldset>
						</form>
						`;

	class SACHandsonTableStylingPanel extends HTMLElement {
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
						opacity: this.opacity
					}
				}
			}));
		}
		
		set opacity(newOpacity) {
			this._shadowRoot.getElementById("styling_opacity").value = newOpacity;
		}
		
		get opacity() {
			return this._shadowRoot.getElementById("styling_opacity").value;
		}
	}

	window.customElements.define("com-sap-sample-sachandsontable-styling", SACHandsonTableStylingPanel);
})()