import { createEffect, createMemo, createSignal, JSXElement, For, mergeProps } from 'solid-js';
import './assets/stylesheets/base.scss';
import moment from 'moment';
import { monthList, viewList, weekDays } from './utils/constant';
import { Text } from 'solid-i18n';
import arrowIcon from './assets/icons/arrow.svg';
import clockLogo from './assets/icons/clock.svg';
import calendarLogo from './assets/icons/calendar.svg';
import calendarClockLogo from './assets/icons/calendarClock.svg';

interface IPropsValue {
    activeView: string;
    startDate?: Date;
    endDate?: Date;
    currentDate?: Date;
    dateRangeDifference: number;
    date: string;
    month: string;
    year: string;
    day: string;
    time: string;
    currentWeekStartDate: Date;
    currentWeekEndDate: Date;
    setCalendarState: ( props: boolean ) => void;
}

interface ICalendarComponentProps {
    dateFormat?: string;
    language?: string;
    customizeRangeSelectedDates?: string;
    customizeCalendar?: string;
    customizeCalendarToggler?: string;
    customizeTogglerArrowIcon?: string;
    customizeTogglerCalendarIcon?: string;
    customizeCalendarBody?: string;
    prevDate?: Date;
    minDate?: Date;
    maxDate?: Date;
    enableDateRangeSelector?: boolean;
    currentDate: Date | string;
    headerMonthFormat?: string;
    headerYearFormat?: string;
    enableArrowNavigation?: boolean;
    enableSelectedDate?: boolean;
    enableSelectedDateEditor?: boolean;
    enableTodayNavigator?: boolean;
    customizeSelectedDate?: string;
    customizeLeftArrow?: string;
    customizeRightArrow?: string;
    customizeActiveMonth?: string;
    customizeTodayNavigator?: string;
    activeCalendarView?: 'day' | 'month' | 'year';
    cutomizeCalendarViewButtons?: string;
    enableCalendarViewType?: boolean;
    customizeListView?: string;
    customizeListHeader?: string;
    customizeYearLeftNavigationArrow?: string;
    customizeYearRightNavigationArrow?: string;
    enableTimeView?: boolean;
    ednableTimeEditing?: boolean;
    customizeTimeViewSwitch?: string;
    customizeTimeInputField?: string;
    customizeTimeUpdateButton?: string;
    customizeConsolidateTimeView?: string;
    customizeTimeDownArrow?: string;
    customizeTimeUpArrow?: string;
    renameTimeUpdateButton?: string;
    customizeUpdateCalenderIcon?: string;
    closeOnSelect?: boolean;
    children?: JSXElement;
    calendarResponse?: ( props: IPropsValue ) => void;
    calendarWidth?: number;
}

const DatePicker = (
    _props: any ) =>
{
    const props = mergeProps( { customizeTogglerCalendarIcon: '', enableDateRangeSelector: false, prevDate: moment().startOf( 'weeks' ).toDate(), customizeRangeSelectedDates: '', closeOnSelect: false, customizeCalendar: '', customizeCalendarToggler: '', customizeTogglerArrowIcon: '', customizeCalendarBody: '', calendarWidth: 0, headerMonthFormat: 'MMM', headerYearFormat: 'YYYY', enableArrowNavigation: true, customizeLeftArrow: '', customizeRightArrow: '', customizeActiveMonth: '', enableSelectedDate: true, enableSelectedDateEditor: true, dateFormat: 'DD MMM, YYYY', customizeSelectedDate: '', enableTodayNavigator: false, customizeTodayNavigator: '', cutomizeCalendarViewButtons: '', activeCalendarView: 'day', enableCalendarViewType: false, customizeListView: '', customizeListHeader: '', customizeYearLeftNavigationArrow: '', customizeYearRightNavigationArrow: '', enableTimeView: false, ednableTimeEditing: false, customizeTimeViewSwitch: '', customizeTimeInputField: '', customizeTimeUpdateButton: '', customizeConsolidateTimeView: '', customizeTimeDownArrow: '', customizeTimeUpArrow: '', customizeUpdateCalenderIcon: '', renameTimeUpdateButton: '' }, _props );
    const [ locDate, setLocDate ] = createSignal<Date | undefined>();

    const [ previousDateState, setPreviousDate ] = createSignal<Date | undefined>();

    const [ dateRangeArr, setdateRangeArr ] = createSignal<Date[]>( [] );

    const [ headerView, setHeaderView ] = createSignal<{ [key: string]: number | string }>( { monthIndex: 0, month: '', year: 0 } );

    const [ activeView, setActiveView ] = createSignal<string>( props.activeCalendarView );

    const [ yearRangeOffset, setYearRangeOffset ] = createSignal( { start: Number( moment( props.currentDate ).format( 'YYYY' ) ) - 4, offset: 0 } );

    const [ isTimeViewEnabled, setTimeView ] = createSignal( false );

    const [ timeValue, setTime ] = createSignal<{ [key: string]: string }>( { hour: '', min: '', meridiem: '' } );

    const [ isCalendarEnabled, setCalendarState ] = createSignal( false );


    const dateList = createMemo( () =>
    {
        const currentMonth = headerView().monthIndex;
        const currentYear = headerView().year;
        const monthStartDate = moment( `${currentMonth}, ${currentYear}`, 'MM, YYYY' ).startOf( 'month' ).format( 'DD MMMM, YYYY' );

        const weekStartDate = moment( monthStartDate, 'DD MMMM, YYYY' ).startOf( 'week' ).toDate();

        return [ ...Array( 35 ) ].map( ( _1, index ) =>
        {
            return moment( weekStartDate ).add( index, 'days' ).toDate();
        } );
    } );

    const momentFormatter = ( date: Date | undefined, formatStr: string ) =>
    {
        return moment( date ).format( formatStr );
    };

    // Render only once
    createEffect( () =>
    {
        setPreviousDate( props.prevDate );
        setLocDate( moment( props.currentDate ).toDate() );
        const startDate = moment( props.prevDate ).toDate();
        const endDate = moment( props.currentDate ).toDate();
        setdateRangeArr( [ startDate, endDate ] );
    } );

    //  Render based on locDate;
    createEffect( () =>
    {
        const curentMeridiem = momentFormatter( locDate(), 'A' );
        setTime( { hour: momentFormatter( locDate(), 'HH' ), min: momentFormatter( locDate(), 'mm' ), meridiem: curentMeridiem } );
        const month = Number( momentFormatter( locDate(), 'MM' ) );
        setHeaderView( () => ( {
            monthIndex: month,
            month: momentFormatter( locDate(), props.headerMonthFormat ),
            year: momentFormatter( locDate(), props.headerYearFormat ),
        } ) );
    } );

    createEffect( () =>
    {
        if ( props.calendarResponse )
        {
            props.calendarResponse( {
                activeView: activeView(),
                startDate: previousDateState(),
                endDate: locDate(),
                currentDate: locDate(),
                dateRangeDifference: Math.abs( ( locDate()?.getDate() || 0 ) - ( previousDateState()?.getDate() || 0 ) ),
                date: momentFormatter( locDate(), 'DD' ),
                month: momentFormatter( locDate(), 'MM' ),
                year: momentFormatter( locDate(), 'YYYY' ),
                day: momentFormatter( locDate(), 'dddd' ),
                time: momentFormatter( locDate(), 'hh : mm' ),
                currentWeekStartDate: moment( locDate() ).startOf( 'weeks' ).toDate(),
                currentWeekEndDate: moment( locDate() ).endOf( 'weeks' ).toDate(),
                setCalendarState: ( props: any ) => setCalendarState( props ), // to handle the calendar view open and close
            } );
        }
    } );

    const headerNavigation = ( index: number ) =>
    {
        const activeYear = Number( headerView().year );
        const activeMonthIndex = Number( headerView().monthIndex );
        const monthVal = new Date( activeYear, activeMonthIndex + ( index ), 0 );

        setHeaderView( () => ( {
            monthIndex: monthVal.getMonth() + 1,
            month: momentFormatter( monthVal, props.headerMonthFormat ),
            year: momentFormatter( monthVal, props.headerYearFormat ),
        } ) );
    };

    // navigate year range during input field onchange and today onClick
    const yearViewNavigation = ( value: Date ) =>
    {
        if ( ( yearRangeOffset().start > value.getFullYear() || ( ( yearRangeOffset().start + 8 ) < value.getFullYear() ) ) )
        {
            setYearRangeOffset( { start: value.getFullYear() - 4, offset: 0 } );
        }
    };

    // handles onChange in Date edit field
    const editDate = ( value: string ) =>
    {
        const currentDate: any = moment( value, 'DD MMM, YYYY' ).toDate();
        if ( currentDate.toString() !== 'Invalid Date' )
        {
            if ( !dateRangeArr()[1] )
            {
                setdateRangeArr( [ ...dateRangeArr(), currentDate ] );
            }
            setLocDate( currentDate );
            yearViewNavigation( currentDate );
        }
    };

    // handles month view selection
    const monthSelection = ( selectedMonthInd: number ) =>
    {
        const activeYear = Number( headerView().year );
        const newDate = new Date( activeYear, selectedMonthInd - 1, locDate()?.getDate() );
        if ( newDate.toString() !== 'Invalid Date' )
        {
            setLocDate( newDate );
        }
        else
        {
            setLocDate( new Date( activeYear, selectedMonthInd, 1 ) );
        }
    };

    // handles year view range during navigation
    const yearNavigation = ( value: number ) =>
    {
        const offset = yearRangeOffset().offset + ( value );
        const startYear = yearRangeOffset().start + ( 9 * value );
        setYearRangeOffset( { start: startYear, offset } );
    };

    const handleTimeChange = ( value: number, key: string, range: number ) =>
    {
        const data = Number( timeValue()[key] ) + value;
        if ( data >= 0 && data <= range )
        {
            const value = data < 10 ? `0${String( data )}` : data;
            setTime( { ...timeValue(), [key]: String( value ) } );
        }
    };

    const handleMultiSelectDate = ( value: Date ) =>
    {
        if ( dateRangeArr().length === 2 )
        {
            setdateRangeArr( [ value ] );
        }
        else
        {
            setdateRangeArr( [ ...dateRangeArr(), moment( value ).endOf( 'days' ).toDate() ] );
        }
    };

    createEffect( () =>
    {
        if ( dateRangeArr()[0] )
        {
            setPreviousDate( dateRangeArr()[0] );
        }
        if ( dateRangeArr()[1] )
        {
            setLocDate( dateRangeArr()[1] );
        }
    } );

    const isTodayEnabled = createMemo( () =>
    {
        const today = moment().startOf( 'days' ).toDate();
        const seletedDate = moment( locDate() ).startOf( 'days' ).toDate();
        return moment( seletedDate ).isSame( today );
    } );

    return (
        <div class={`calendar ${props.customizeCalendar}`}>
            <div
                class={`cal-initial-view cur-pointer ${props.customizeCalendarToggler}`}
                onClick={() => setCalendarState( ( prev ) => !prev )}
                style={
                    props.calendarWidth && props.calendarWidth < 29 ? { 'max-width': `${props.calendarWidth}rem`, 'min-width': `${props.calendarWidth}rem` } : undefined
                }
            >
                {( props.calendarWidth ? ( props.calendarWidth >= 13 ) : true ) ? <img src={calendarClockLogo} alt="clock icon" class={`${props.customizeTogglerCalendarIcon}`} /> : null}
                {moment( locDate() ).format( props.dateFormat )}
                <img src={arrowIcon} alt="arrow icon" class={`arrow-icon ${isCalendarEnabled() ? 'rotate-arrow-icon' : ''} ${props.customizeTogglerArrowIcon}`} />
            </div>

            <div class={`cal-parent ${!isCalendarEnabled() ? 'd-none' : ''} ${props.customizeCalendarBody}`}>
                {/* Header */}
                <div class={`cal-header ${props.enableArrowNavigation ? '' : 'jst-center'}`}>
                    {
                        props.enableArrowNavigation ?
                            <div
                                class={`left-arrow ${activeView() === 'day' ? 'cur-pointer' : 'v-none'} ${props.customizeLeftArrow}`}
                                onClick={() => headerNavigation( -1 )}
                            >
                                <img src={arrowIcon} alt="left arrow" />
                            </div>
                            : null
                    }
                    <div class={`date-val ${props.customizeActiveMonth}`}> {headerView().month} - {headerView().year} </div>
                    {
                        props.enableArrowNavigation ?
                            <div
                                class={`right-arrow ${activeView() === 'day' ? 'cur-pointer' : 'v-none'} ${props.customizeRightArrow}`}
                                onClick={() => { if ( activeView() === 'day' ) { headerNavigation( 1 ); } }}
                            >
                                <img src={arrowIcon} alt="right arrow" />
                            </div>
                            : null
                    }
                </div>

                {/* Sub Header */}
                {props.enableTodayNavigator || props.enableSelectedDate ?
                    <div class={`cal-sub-header ${!props.enableTodayNavigator || !props.enableTimeView ? 'jst-center' : ''}`}>
                        {props.enableTodayNavigator ?
                            <button
                                class={`btn-class jump-today cur-pointer ${isTodayEnabled() ? 'active' : ''} ${props.customizeTodayNavigator}`}
                                onClick={() =>
                                {
                                    const newDate = moment().toDate();
                                    yearViewNavigation( newDate );
                                    setLocDate( newDate );
                                }}
                            >
                                Today
                            </button> : null
                        }

                        {props.enableSelectedDate &&
                            <div class="today-col">
                                <input
                                    type="text"
                                    placeholder="DD MMM YYYY"
                                    class={`today-col-input ${props.customizeSelectedDate}`}
                                    value={momentFormatter( locDate() || moment().toDate(), 'DD MMM, YYYY' )}
                                    readOnly={!props.enableSelectedDateEditor}
                                    onKeyPress={( event: any ) =>
                                    {
                                        if ( event.key === 'Enter' && event.target.value )
                                        {
                                            editDate( event.target.value );
                                        }
                                    }}
                                />
                            </div>
                        }
                        {props.enableTimeView ? <img
                            class={`icon-height cur-pointer ${props.customizeTimeViewSwitch}`}
                            src={isTimeViewEnabled() ? calendarLogo : clockLogo}
                            alt="Day Time Icon"
                            onClick={() =>
                            {
                                setTimeView( !isTimeViewEnabled() );
                            }}
                        /> : null}
                    </div> : null
                }

                {/* Calendar View sub-header */}
                {props.enableCalendarViewType ?
                    <div class="cal-sub-header-section">
                        <For each={viewList}>{( it ) =>
                        {
                            return (
                                <button
                                    class={`btn-class btn-width cur-pointer ${props.cutomizeCalendarViewButtons} ${it.value === activeView() ? 'active' : ''}`}
                                    onClick={( e ) =>
                                    {
                                        e.preventDefault();
                                        if ( isTimeViewEnabled() )
                                        {
                                            setTimeView( false );
                                        }
                                        setActiveView( it.value );
                                    }}
                                >
                                    {<Text message={it.label}/>}
                                </button>
                            );
                        }}</For>
                    </div> : null}

                <div class={'main-container'}>
                    {/* Month View */}
                    {activeView() !== 'month' || isTimeViewEnabled() ? null :
                        <div class="container-month-view">
                            {monthList.map( ( it, monthIndex ) =>
                            {
                                let isMonthDisabled = false;

                                if ( props.maxDate )
                                {
                                    if ( Number( props.maxDate.getFullYear() ) < Number( locDate()?.getFullYear() ) )
                                    {
                                        isMonthDisabled = true;
                                    }
                                    else if ( Number( props.maxDate.getFullYear() ) === Number( locDate()?.getFullYear() ) )
                                    {
                                        isMonthDisabled = Number( props.maxDate.getMonth() ) < monthIndex;
                                    }
                                }
                                if ( props.minDate )
                                {
                                    if ( Number( props.minDate.getFullYear() ) > Number( locDate()?.getFullYear() ) )
                                    {
                                        isMonthDisabled = true;
                                    }
                                    else if ( Number( props.minDate.getFullYear() ) === Number( locDate()?.getFullYear() ) )
                                    {
                                        isMonthDisabled = isMonthDisabled || Number( props.minDate.getMonth() ) > monthIndex;
                                    }
                                }

                                return (
                                    <div
                                        class={`container-list cur-pointer ${props.customizeListView} ${( ( locDate()?.getMonth() || 0 ) + 1 ) === it.monthIndex ? 'active box-shadow-card' : ''} ${isMonthDisabled ? 'cust-dis pointer-none' : ''}`}
                                        onClick={() => monthSelection( it.monthIndex )}
                                    >
                                        {<Text message={it.short}></Text>}
                                    </div>
                                );
                            } )}
                        </div>
                    }

                    {/* Year View */}
                    {activeView() !== 'year' || isTimeViewEnabled() ? null :
                        <div class="container-year-view">
                            <img src={arrowIcon} class={`${props.customizeYearLeftNavigationArrow} year-navi__icon cur-pointer`} alt="left arrow" onClick={() => { yearNavigation( -1 ); }} />

                            <div class="container-year-list">
                                {[ ...Array( 9 ) ].map( ( _1, index ) =>
                                {
                                    const value = yearRangeOffset().start + index;
                                    const fullYear = Number( momentFormatter( locDate(), 'YYYY' ) );
                                    const month = Number( momentFormatter( locDate(), 'MM' ) );
                                    const date = Number( momentFormatter( locDate(), 'DD' ) );
                                    let isYearDisabled = false;
                                    if ( props.maxDate || props.minDate )
                                    {
                                        isYearDisabled = ( props.maxDate ? value > Number( props.maxDate.getFullYear() ) : isYearDisabled )
                                            || ( props.minDate ? value < Number( props.minDate.getFullYear() ) : isYearDisabled );
                                    }

                                    return (
                                        <div
                                            class={`container-list cur-pointer ${props.customizeListView} ${value === fullYear ? 'active box-shadow-card' : ''} ${isYearDisabled ? 'cust-dis pointer-none' : ''}`}
                                            onClick={() =>
                                            {
                                                setLocDate( new Date( value, month - 1, date ) );
                                                if ( props.closeOnSelect )
                                                {
                                                    setCalendarState( false );
                                                }
                                            }}
                                        >
                                            {`${value}`}
                                        </div>
                                    );
                                } )}
                            </div>
                            <img src={arrowIcon} class={`${props.customizeYearRightNavigationArrow} year-navi__icon year-navi__icon_right cur-pointer`} alt="right arrow" onClick={() => { yearNavigation( 1 ); }} />
                        </div>
                    }

                    {/* Day view */}
                    {activeView() !== 'day' || isTimeViewEnabled() ? null :
                        <div class="container-day-view">

                            <div class="list-header week-list">
                                <For each={weekDays}>{( it ) =>
                                {
                                    return (
                                        <div class={`week-list-items pointer-none cust-dis ${props.customizeListHeader}`}>{<Text message={it.short}/>}</div>
                                    );
                                }}</For>
                            </div>
                            <div class="week-list week-list__date">
                                <For each={dateList()}>{( it ) =>
                                {
                                    const startDate = moment( '12, 1920', 'MM, YYYY' ).startOf( 'months' ).toDate();
                                    const endDate = moment( new Date(), 'MM, YYYY' ).endOf( 'months' ).toDate();

                                    let isActive = false; // gives selected dates
                                    let isRangeActive = false; // highlights the dates in-between
                                    let isDatesDisabled = false; // disables the prev date during selection

                                    if ( props.enableDateRangeSelector )
                                    {
                                        if ( dateRangeArr()[0] && !dateRangeArr()[1] )
                                        {
                                            isActive = moment( it ).isSame( moment( previousDateState() ).startOf( 'days' ) );
                                            isDatesDisabled = moment( it ).isBefore( moment( previousDateState() ).startOf( 'days' ) );
                                            isRangeActive = false;
                                        }
                                        else if ( dateRangeArr()[0] && dateRangeArr()[1] )
                                        {
                                            isActive = moment( it ).isSame( moment( locDate() ).startOf( 'days' ) ) || moment( it ).isSame( moment( previousDateState() ).startOf( 'days' ) );
                                            isRangeActive = moment( it ).isAfter( moment( previousDateState() ).startOf( 'days' ) ) && moment( it ).isBefore( moment( locDate() ).startOf( 'days' ) );
                                        }
                                    }
                                    else
                                    {
                                        isActive = moment( it ).isSame( moment( locDate() ).startOf( 'days' ) );
                                    }

                                    // handles Max date given by user
                                    if ( props.maxDate )
                                    {
                                        isDatesDisabled = isDatesDisabled || moment( it ).isSameOrAfter( moment( props.maxDate ).startOf( 'days' ) );
                                    }
                                    if ( props.minDate )
                                    {
                                        isDatesDisabled = isDatesDisabled || moment( it ).isSameOrBefore( moment( props.minDate ).startOf( 'days' ) );
                                    }
                                    return (
                                        <div
                                            class={`week-list-items cur-pointer 
                                        ${isActive ? `${props.enableDateRangeSelector ? 'active-bg' : 'active '} box-shadow-card` : ''} 
                                        ${props.customizeListView}
                                        ${it < startDate || it > endDate ? 'cust-dis' : ''}
                                        ${isRangeActive ? `bg-hover-clr ${props.customizeRangeSelectedDates}` : ''}
                                        ${isDatesDisabled ? 'cust-dis pointer-none' : ''}
                                        `}
                                            onClick={() =>
                                            {
                                                if ( props.enableDateRangeSelector )
                                                {
                                                    handleMultiSelectDate( it );
                                                }
                                                else
                                                {
                                                    setLocDate( it );
                                                }
                                            }}
                                        >
                                            {momentFormatter( it, 'DD' )}
                                        </div>

                                    );
                                }}</For>
                            </div>
                        </div>
                    }
                    {!isTimeViewEnabled() ? null :
                        <div>
                            <div class="time-picker">
                                <div class={'time-hours-picker'}>
                                    <img
                                        src={arrowIcon}
                                        class={`increment-icon icon_size cur-pointer ${timeValue().hour === '00' ? 'pointer-none cust-dis' : ''} ${props.customizeTimeDownArrow}`}
                                        alt="hour-increment"
                                        onClick={() =>
                                        {
                                            handleTimeChange( -1, 'hour', 23 );
                                        }}
                                    />
                                    <input
                                        class={`${props.customizeTimeInputField} hour_value`}
                                        value={timeValue().hour}
                                        type="number"
                                        readOnly={!props.ednableTimeEditing}
                                        onKeyPress={( e: any ) =>
                                        {
                                            if ( e.target?.value <= 24 && e.target?.value >= 0 && e.code === 'Enter' )
                                            {
                                                const value = e.target?.value < 10 ? `0${e.target?.value}` : e.target?.value;
                                                setTime( { ...timeValue(), hour: value } );
                                            }
                                        }}
                                    />
                                    <img
                                        src={arrowIcon}
                                        class={`decrement-icon icon_size cur-pointer ${timeValue().hour === '23' ? 'pointer-none cust-dis' : ''} ${props.customizeTimeUpArrow}`}
                                        alt="hour-decrement"
                                        onClick={() =>
                                        {
                                            handleTimeChange( 1, 'hour', 23 );
                                        }}
                                    />
                                </div>

                                <div class={'time-seperator'}>:</div>
                                <div class={'time-mins-picker'}>
                                    <img
                                        src={arrowIcon}
                                        class={`increment-icon icon_size cur-pointer ${timeValue().min === '00' ? 'pointer-none cust-dis' : ''} ${props.customizeTimeDownArrow}`}
                                        alt="min-increment"
                                        onClick={() =>
                                        {
                                            handleTimeChange( -1, 'min', 59 );
                                        }}
                                    />
                                    <input
                                        class={`${props.customizeTimeInputField} min_value`}
                                        value={timeValue().min}
                                        type="number"
                                        readOnly={!props.ednableTimeEditing}
                                        onKeyPress={( e: any ) =>
                                        {
                                            if ( e.target?.value <= 60 && e.target?.value >= 0 && e.code === 'Enter' )
                                            {
                                                const value = e.target?.value < 10 ? `0${e.target?.value}` : e.target?.value;
                                                setTime( { ...timeValue(), min: value } );
                                            }
                                        }}
                                    />
                                    <img
                                        src={arrowIcon}
                                        class={`decrement-icon icon_size cur-pointer ${timeValue().min === '59' ? 'pointer-none cust-dis' : ''} ${props.customizeTimeUpArrow}`}
                                        alt="min-decrement"
                                        onClick={() =>
                                        {
                                            handleTimeChange( 1, 'min', 59 );
                                        }}
                                    />
                                </div>
                            </div>
                            <hr />
                            <div class={'time-parent'}>
                                <div class={`time-view ${props.customizeConsolidateTimeView}`}>
                                    <img class={`icon-height ${props.customizeUpdateCalenderIcon}`} src={calendarClockLogo} alt="Day Time Icon" />
                                    <div class="time-value">
                                        {momentFormatter( locDate(), 'ddd DD MMM, YYYY ' )}{timeValue().hour}:{timeValue().min}
                                    </div>
                                </div>
                                <button
                                    class={`btn-class active-bg btn-width cur-pointer ${props.customizeTimeUpdateButton}`}
                                    onClick={() =>
                                    {
                                        const newDate = moment( locDate() );
                                        newDate.set( 'hour', Number( timeValue().hour ) );
                                        newDate.set( 'minute', Number( timeValue().min ) );
                                        if ( !moment( locDate() ).isSame( newDate.toDate() ) )
                                        {
                                            setLocDate( newDate.toDate() );
                                            setTimeView( false );
                                            if ( props.closeOnSelect )
                                            {
                                                setCalendarState( false );
                                            }
                                        }
                                    }}
                                >
                                    {props.renameTimeUpdateButton || 'Update'}
                                </button>
                            </div>
                        </div>
                    }
                </div>
                {
                    props.children
                }
            </div>
        </div>
    );
};

export default DatePicker;
