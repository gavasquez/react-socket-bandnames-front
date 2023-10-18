import { Chart } from 'chart.js/auto';
import React, { useContext, useRef, useState } from 'react'
import { useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandChart = () => {

    const ctx = useRef(null);

    const { socket } = useContext(SocketContext);

    const [bands, setBands] = useState([]);

    const [chart, setChart] = useState(null);

    const colors = ['rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'];

    const borderColors = ['rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'];

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            setBands(bands);
        });
    }, [socket]);

    useEffect(() => {

        if (chart)
            chart.destroy();

        const names = [];
        const votes = [];

        bands.forEach(e => {
            names.push(e.name);
            votes.push(e.votes);
        });
        crearGrafica(names, votes);
    }, [bands]);


    const crearGrafica = (names = [], votes = []) => {
        const myChart = new Chart(ctx.current, {
            type: 'bar',
            data: {
                labels: names,
                datasets: [{
                    label: '# de Votes',
                    data: votes,
                    backgroundColor: colors,
                    borderColors: borderColors,
                    borderWidth: 1
                }]
            },
            options: {
                animation: false,
                indexAxis: 'y',
                scales: {
                    x: {
                        stacked: true
                    }
                }
            }
        });
        setChart(myChart);
    }


    return (
        <canvas ref={ctx}></canvas>
    )
}
