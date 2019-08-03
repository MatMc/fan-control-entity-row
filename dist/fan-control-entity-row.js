class CustomFanRow extends Polymer.Element {

    static get template() {
        return Polymer.html`
            <style is="custom-style" include="iron-flex iron-flex-alignment"></style>
            <style>
                :host {
                    line-height: inherit;
                }
                .speed {
                    min-width: 30px;
                       max-width: 30px;
                    height: 30px;
                    margin-left: 2px;
                    margin-right: 2px;
                    background-color: #759aaa;
                    border: 1px solid lightgrey; 
                    border-radius: 4px;
                    font-size: 10px !important;
                    color: inherit;
                    text-align: center;
                    float: right !important;
                    padding: 1px;
                    cursor: pointer;
                }
                
            </style>
            <hui-generic-entity-row hass="[[hass]]" config="[[_config]]">
                <div class='horizontal justified layout' on-click="stopPropagation">
                <button
                    class='speed'
                    style='[[_lowestOnColor]]'
                    toggles name="lowest"
                    on-click='setSpeed'
                    disabled='[[_isOnLowest]]'>Min</button>
                <button
                    class='speed'
                    style='[[_lowOnColor]]'
                    toggles name="low"
                    on-click='setSpeed'
                    disabled='[[_isOnLow]]'>Low</button>
                <button
                    class='speed'
                    style='[[_medOnColor]]'
                    toggles name="medium"
                    on-click='setSpeed'
                    disabled='[[_isOnMed]]'>Med</button>
                <button
                    class='speed'
                    style='[[_highOnColor]]'
                    toggles name="high"
                    on-click='setSpeed'
                    disabled='[[_isOnHigh]]'>High</button>
                <button
                    class='speed'
                    style='[[_autoOnColor]]'
                    toggles name="auto"
                    on-click='setSpeed'
                    disabled='[[_isOnAuto]]'>Auto</button>
                <button
                    class='speed'
                    style='[[_offColor]]'
                    toggles name="off"
                    on-click='setSpeed'
                    disabled='[[_isOffState]]'>OFF</button>
                </div>
            </hui-generic-entity-row>
        `;
    }

    static get properties() {
        return {
            hass: {
                type: Object,
                observer: 'hassChanged'
            },
                _config: Object,
                _stateObj: Object,
                _lowestOnColor: String,
                _lowOnColor: String,
                _medOnColor: String,
                _highOnColor: String,
                _autoOnColor: String,
                _offColor: String,
                _isOffState: Boolean,
                _isOnState: Boolean,
                _isOnLowest: Boolean,
                _isOnLow: Boolean,
                   _isOnMed: Boolean,
                _isOnHigh: Boolean,
                _isOnAuto: Boolean,
        }
    }

    setConfig(config) {
        this._config = config;
        
    this._config = {
            customTheme: false,
            customIsOffColor: '#f44c09',
            customIsOnLowestColor: '#43A047',
            customIsOnLowColor: '#43A047',
            customIsOnMedColor: '#43A047',
            customIsOnHighColor: '#43A047',
            customIsOnAutoColor: '#43A047',
            customIsOffSpdColor: '#759aaa',
            ...config
        };
    }

    hassChanged(hass) {

        const config = this._config;
        const stateObj = hass.states[config.entity];
        const custTheme = config.customTheme;
        const custOnLowestClr = config.customIsOnLowestColor;
        const custOnLowClr = config.customIsOnLowColor;
        const custOnMedClr = config.customIsOnMedColor;
        const custOnHighClr = config.customIsOnHighColor;
        const custOnAutoClr = config.customIsOnAutoColor;
        const custOffSpdClr = config.customIsOffSpdColor;
        const custOffClr = config.customIsOffColor;
        
                        
        
    let speed;
        if (stateObj && stateObj.attributes) {
            speed = stateObj.attributes.speed || 'off';
        }
        
    let lowest;
    let low;
    let med;
    let high;
    let auto;
    let offstate;
        
    if (stateObj && stateObj.attributes) {
        if (stateObj.state == 'on' && stateObj.attributes.speed == 'lowest') {
            lowest = 'on';
        } else if (stateObj.state == 'on' && stateObj.attributes.speed == 'low') {
            low = 'on';
        } else if (stateObj.state == 'on' && stateObj.attributes.speed == 'medium') {
            med = 'on';
        } else if (stateObj.state == 'on' && stateObj.attributes.speed == 'high') {
            high = 'on';
        } else if (stateObj.state == 'on' && stateObj.attributes.speed == 'auto') {
            auto = 'on';
        } else {
            offstate = 'on';
        }
    }
    
    let lowestcolor;
    let lowcolor;
    let medcolor;
    let highcolor;
    let autocolor;
    let offcolor;
                
    if (custTheme) {

        if (lowest == 'on') {
            lowestcolor = 'background-color:' + custOnLowestClr;
        } else {
            lowestcolor = 'background-color:' + custOffSpdClr;
        }

        if (low == 'on') {
            lowcolor = 'background-color:' + custOnLowClr;
        } else {
            lowcolor = 'background-color:' + custOffSpdClr;
        }

        if (med == 'on') {
            medcolor = 'background-color:'  + custOnMedClr;
        } else {
            medcolor = 'background-color:' + custOffSpdClr;
        }
        
        if (high == 'on') {
            highcolor = 'background-color:'  + custOnHighClr;
        } else {
            highcolor = 'background-color:' + custOffSpdClr;
        }

        if (auto == 'on') {
            autocolor = 'background-color:'  + custOnAutoClr;
        } else {
            autocolor = 'background-color:' + custOffSpdClr;
        }
        
        if (offstate == 'on') {
            offcolor = 'background-color:'  + custOffClr;
        } else {
            offcolor = 'background-color:' + custOffSpdClr;
        }

      } else {

        if (lowest == 'on') {
            lowestcolor = 'background-color: var(--paper-toggle-button-checked-button-color)';
        } else {
            lowestcolor = 'background-color: var(--paper-toggle-button-unchecked-button-color)';
        }

          if (low == 'on') {
            lowcolor = 'background-color: var(--paper-toggle-button-checked-button-color)';
        } else {
            lowcolor = 'background-color: var(--paper-toggle-button-unchecked-button-color)';
        }
        
        if (med == 'on') {
            medcolor = 'background-color: var(--paper-toggle-button-checked-button-color)';
        } else {
            medcolor = 'background-color: var(--paper-toggle-button-unchecked-button-color)';
        }
        
        if (high == 'on') {
            highcolor = 'background-color: var(--paper-toggle-button-checked-button-color)';
        } else {
            highcolor = 'background-color: var(--paper-toggle-button-unchecked-button-color)';
        }

        if (auto == 'on') {
            autocolor = 'background-color: var(--paper-toggle-button-checked-button-color)';
        } else {
            autocolor = 'background-color: var(--paper-toggle-button-unchecked-button-color)';
        }
        
        if (offstate == 'on') {
            offcolor = 'background-color: var(--paper-toggle-button-checked-button-color)';
        } else {
            offcolor = 'background-color: var(--paper-toggle-button-unchecked-button-color)';
        }
    }
    
            
    this.setProperties({
        _stateObj: stateObj,
        _isOffState: stateObj.state == 'off',
        _isOnLowest: lowest === 'on',
        _isOnLow: low === 'on',
        _isOnMed: med === 'on',
        _isOnHigh: high === 'on',
        _isOnAuto: auto === 'on',
        _lowestOnColor: lowestcolor,
        _lowOnColor: lowcolor,
        _medOnColor: medcolor,
        _highOnColor: highcolor,
        _autoOnColor: autocolor,
        _offColor: offcolor,
    });
    }

    stopPropagation(e) {
        e.stopPropagation();
    }

    setSpeed(e) {
        const speed = e.currentTarget.getAttribute('name');
        if( speed == 'off' ){
            this.hass.callService('fan', 'turn_off', {entity_id: this._config.entity});
        } else {
            this.hass.callService('fan', 'set_speed', {entity_id: this._config.entity, speed: speed});
            this.hass.callService('fan', 'turn_on', {entity_id: this._config.entity});
        }
    }

}
    
customElements.define('fan-control-entity-row', CustomFanRow);
