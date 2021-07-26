import axios from 'axios'
import moment from 'moment';
import React, { useEffect, useState } from 'react'

export const Covid = () => {

    const [title, setTitle] = useState('Global');
    const [dataDate, setDataDate] = useState('');
    const [stats, setStats] = useState({});
    const [countries, setCountries] = useState([]);
    const [select, setSelect] = useState(0);
    const [loading, setLoading] = useState('');

    useEffect(() => {
        getDataCovid();
    }, []);

    const getDataCovid = async() => {
        try {
            setLoading(true);
            const {data} = await axios.get('https://api.covid19api.com/summary');
            setLoading(false);
            setTitle('Global')
            setSelect(0);
            setDataDate(moment(data.Date).format('MMMM Do YYYY, h:mm:ss a'))
            setStats(data.Global)
            setCountries(data.Countries)            
        } catch (error) {
            console.log('error en getDataCovid', error.message)
        }
        
    };

    const onChange = (e) => {
        setSelect(e.target.value)
        const country = countries.find(item => item.ID === e.target.value)
        setStats(country)
        setTitle(country.Country)
    };

    const numberWithCommas = (x) => {
        if (typeof x !== 'undefined'){return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
    };

    return (
        <div>
            <header className='text-center text-white bg-dark p-4 mb-5 col-xxl-12'>
                <div className='fw-bold fs-1'>
                    <i className='fa fa-biohazard m-2'></i>
                    COVID-19 TRACKER
                </div>
                <p>
                    API by
                    {' '}
                    <a href="https://api.covid19api.com" target = '_blank' rel = 'noreferrer' className='text-white'>
                        Covid19api.com
                    </a>
                </p>
            </header>

            {loading?
                <div class="d-grid gap-2">
                    <button className="btn btn-dark mx-auto" type="button" disabled>
                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    Loading...
                    </button>
                </div>: 
                    <div className="container">
                        <div className="text-center">
                            <h2 className='fw-bold'>{title}</h2>
                            <div className="my-4">{dataDate}</div>
                        </div>

                        <div className="row g-4 mb-5">
                            {/* box-1 */}
                            <div className="col-md-4">
                                <div className="card text-center p-5 bg-secondary">
                                    <h3 className='fw-bold mb-4 text-white'>* CASOS *</h3>
                                    <div className="mb-4 fs-4">
                                        <span className='fw-bold'>Nuevos : </span>
                                        {numberWithCommas(stats.NewConfirmed)}
                                    </div>
                                    <div className="mb-4 fs-4">
                                        <span className='fw-bold'>Totales : </span>
                                        {numberWithCommas(stats.TotalConfirmed)}
                                    </div>
                                </div>
                            </div>

                            {/* box-2 */}
                            <div className="col-md-4">
                                <div className="card text-center p-5 bg-danger">
                                    <h3 className='fw-bold mb-4 text-white'>* MUERTOS *</h3>
                                    <div className="mb-4 fs-4">
                                        <span className='fw-bold'>Nuevos : </span>
                                        {numberWithCommas(stats.NewDeaths)}
                                    </div>
                                    <div className="mb-4 fs-4">
                                        <span className='fw-bold'>Totales : </span>
                                        {numberWithCommas(stats.TotalDeaths)}
                                    </div>
                                </div>
                            </div>

                            {/* box-3 */}
                            <div className="col-md-4">
                                <div className="card text-center p-5 bg-primary">
                                    <h3 className='fw-bold mb-4 text-white'>* RECUPERADOS *</h3>
                                    <div className="mb-4 fs-4">
                                        <span className='fw-bold'>Nuevos : </span>
                                        {numberWithCommas(stats.NewRecovered)}
                                    </div>
                                    <div className="mb-4 fs-4">
                                        <span className='fw-bold'>Totales : </span>
                                        {numberWithCommas(stats.TotalRecovered)}
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="row g-4 mb-4">
                            {/* box-1 */}
                            <div className="col-md-12">
                                <div className="card text-center p-5 bg-warning">
                                    <h3 className='fw-bold mb-4'>* TASAS *</h3>
                                    <div className="mb-4 fs-4">
                                        <span className='fw-bold'>Mortalidad : </span>
                                        {Math.round(stats.TotalDeaths/stats.TotalConfirmed*10000)/100} {'%'}
                                    </div>
                                    <div className="mb-4 fs-4">
                                        <span className='fw-bold'>Recuperación : </span>
                                        {Math.round(stats.TotalRecovered/stats.TotalConfirmed*10000)/100} {'%'}
                                    </div>
                                </div>
                            </div>

                        </div>

                        <select className="my-3 col-12 py-3 border bg-dark text-white" value={select} placeholder='Seleccione el país' onChange = {e => onChange(e)}>
                            <option hidden selected>
                                Seleccione el país
                            </option>
                            {
                                countries.map(item => (
                                    <option key={item.ID} value={item.ID}>
                                        {item.Country}
                                    </option>
                                ))
                            }
                        </select>

                        {stats.Country && (
                            <div class="d-grid gap-2 col-6 mx-auto mb-4">
                                <button className='btn btn-dark mx-auto' onClick = {() => getDataCovid()}>
                                Global
                                </button>
                            </div>
                        )}

                        
                    </div>
            }
    </div>
    )
}
