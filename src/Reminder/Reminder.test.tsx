import configureMockStore, { MockStore } from 'redux-mock-store'
import thunk from 'redux-thunk'
import chai from 'chai'
let expect = chai.expect;

import { SAVE_REMINDER, SAVE_REMINDER_SUCCESS } from '../store/actionTypes';
import { saveReminder } from '../store/actionCreators';
import reducer from '../store/reducer';
import { applyMiddleware, createStore, Store } from 'redux';
import nock from 'nock';

const middlewares = [thunk];

const API_URL = process.env.REACT_APP_OPEN_WEATHER_URL;
const API_ICON = process.env.REACT_APP_OPEN_WEATHER_ICON;

describe('reminder actions', () => {	
	let date: Date;
	let mockStore: MockStore;
	let store: Store;

	beforeEach(() => {
		date = new Date();
		mockStore = configureMockStore(middlewares)({});
		store = createStore(reducer, applyMiddleware(thunk));

		const scope = nock(API_URL!)
			.defaultReplyHeaders({
				'access-control-allow-origin': '*',
				'access-control-allow-credentials': 'true' 
			});

		scope
			.get(uri => uri.includes('/geo/1.0/direct'))
			.reply(200, [{"name":"Z","local_names":{"zh":"樟岙村","en":"Z"},"lat":28.2014304,"lon":120.9363512,"country":"CN","state":"Zhejiang"}])

		scope
			.get(uri => uri.includes('/data/2.5/onecall'))
			.reply(200, {"lat":28.2014,"lon":120.9364,"timezone":"Asia/Shanghai","timezone_offset":28800,"daily":[{"dt":1645070400,"sunrise":1645050780,"sunset":1645091272,"moonrise":1645093260,"moonset":1645052580,"moon_phase":0.5,"temp":{"day":278.72,"min":276.9,"max":280.65,"night":276.9,"eve":277.75,"morn":279.43},"feels_like":{"day":276.18,"night":274.48,"eve":275.36,"morn":277.07},"pressure":1024,"humidity":94,"dew_point":277.83,"wind_speed":3.46,"wind_deg":38,"wind_gust":8.38,"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10d"}],"clouds":100,"pop":1,"rain":18.02,"uvi":0.58},{"dt":1645156800,"sunrise":1645137129,"sunset":1645177715,"moonrise":1645183200,"moonset":1645141020,"moon_phase":0.55,"temp":{"day":279.32,"min":276.87,"max":280.67,"night":280.67,"eve":280.13,"morn":277.29},"feels_like":{"day":277.69,"night":279.23,"eve":278.59,"morn":275.52},"pressure":1024,"humidity":92,"dew_point":277.41,"wind_speed":2.68,"wind_deg":356,"wind_gust":4.54,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":100,"pop":1,"rain":10.09,"uvi":2.1},{"dt":1645243200,"sunrise":1645223477,"sunset":1645264158,"moonrise":1645273140,"moonset":1645229340,"moon_phase":0.58,"temp":{"day":281.04,"min":278.15,"max":281.1,"night":278.15,"eve":279.15,"morn":280.41},"feels_like":{"day":279.61,"night":276.23,"eve":277.32,"morn":278.88},"pressure":1023,"humidity":86,"dew_point":278.08,"wind_speed":2.59,"wind_deg":348,"wind_gust":6.41,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":100,"pop":1,"rain":1.54,"uvi":0.63},{"dt":1645329600,"sunrise":1645309824,"sunset":1645350600,"moonrise":1645363080,"moonset":1645317660,"moon_phase":0.62,"temp":{"day":277.77,"min":274.96,"max":277.98,"night":274.96,"eve":276.6,"morn":276.9},"feels_like":{"day":274.88,"night":272.78,"eve":273.55,"morn":273.96},"pressure":1031,"humidity":65,"dew_point":271.02,"wind_speed":3.69,"wind_deg":5,"wind_gust":8.78,"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":100,"pop":0.44,"uvi":4.87},{"dt":1645416000,"sunrise":1645396170,"sunset":1645437042,"moonrise":1645453140,"moonset":1645406040,"moon_phase":0.65,"temp":{"day":280.75,"min":274.67,"max":281.75,"night":279.35,"eve":280.67,"morn":274.67},"feels_like":{"day":279.35,"night":277.83,"eve":278.5,"morn":272.39},"pressure":1031,"humidity":63,"dew_point":273.56,"wind_speed":3.35,"wind_deg":51,"wind_gust":4.68,"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"clouds":100,"pop":0.28,"uvi":6.13},{"dt":1645502400,"sunrise":1645482515,"sunset":1645523483,"moonrise":1645543380,"moonset":1645494540,"moon_phase":0.69,"temp":{"day":277.8,"min":276.23,"max":279.04,"night":276.23,"eve":277.37,"morn":278.57},"feels_like":{"day":275.83,"night":274.07,"eve":274.34,"morn":276.4},"pressure":1034,"humidity":93,"dew_point":276.1,"wind_speed":3.53,"wind_deg":28,"wind_gust":5.82,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":100,"pop":1,"rain":6.12,"uvi":7},{"dt":1645588800,"sunrise":1645568859,"sunset":1645609924,"moonrise":0,"moonset":1645583220,"moon_phase":0.72,"temp":{"day":277.49,"min":276.04,"max":278.04,"night":277.94,"eve":277.83,"morn":276.04},"feels_like":{"day":275.96,"night":276.56,"eve":276.4,"morn":273.63},"pressure":1035,"humidity":89,"dew_point":275.09,"wind_speed":2.42,"wind_deg":351,"wind_gust":3.62,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":100,"pop":1,"rain":1.37,"uvi":7},{"dt":1645675200,"sunrise":1645655202,"sunset":1645696364,"moonrise":1645633680,"moonset":1645672320,"moon_phase":0.75,"temp":{"day":278.01,"min":277.33,"max":279.47,"night":279.06,"eve":279.47,"morn":277.51},"feels_like":{"day":277.09,"night":279.06,"eve":278.76,"morn":275.97},"pressure":1031,"humidity":91,"dew_point":276,"wind_speed":2.35,"wind_deg":355,"wind_gust":3.09,"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":100,"pop":0.95,"rain":2.15,"uvi":7}]})
	});

  it('expected actions should be dispatched on successful request', async () => {
    const expectedActions = [SAVE_REMINDER, SAVE_REMINDER_SUCCESS];
		const action = saveReminder({ date } as IReminder) as any;

		await mockStore.dispatch(action);
		const actualActions = mockStore.getActions().map(action => action.type);
		expect(actualActions).to.eql(expectedActions);
  });

	it('expected save to insert reminder into store', async () => {
		const reminder = { date, city: 'z' } as IReminder;
		await saveReminder(reminder)(store.dispatch);
		
		const state = store.getState();
		expect(state.reminders.length).to.equal(1);
    expect(state.reminders[0]).to.eql(reminder);
		expect(reminder.forecast.description).to.not.be.empty;
  });
});