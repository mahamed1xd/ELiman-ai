"use client";

import { useEffect, useState } from "react";

export default function Radio() {
    const [name, setName] = useState("");
    const [radios, setRadios] = useState([]);
    const [radio, setRadio] = useState(null);

    useEffect(() => {
    async function fetchData() {
        const res = await fetch("https://data-rosy.vercel.app/radio.json");
        const data = await res.json();
        setRadios(data.radios);
    }
    fetchData();
    }, []);

    const showRadio = () => {
        const found = radios.find((r) =>
            r.name.toLowerCase().includes(name.toLowerCase())
        );
        setRadio(found || null);
        setName(""); // إعادة تعيين الـ input
    };

    return (
        <div className="mt-2">
            <h1 className="text-primary font-[ar2] text-2xl text-center">اذاعات القران الكريم</h1>

            <div className="flex flex-row items-center gap-2">
                <input
                    list="radios"
                    value={name}
                    className="input input-bordered w-full my-4 p-2"
                    placeholder="اختر الاذاعة"
                    onChange={(e) => setName(e.target.value)}
                />

                <button className="btn btn-primary text-primary-content" onClick={showRadio}>
                    عرض
                </button>

                <datalist id="radios">
                    {radios.map((r) => (
                        <option key={r.id}>{r.name}</option>
                    ))}
                </datalist>
            </div>

            {!radio && (
                <p className="text-center text-error font-bold">لا توجد إذاعة بهذا الاسم</p>
            )}

            {radio && radio.id != "19" && (
                <div className="flex flex-col items-center border border-base-200 rounded-lg p-4 hover:border-primary hover:scale-105 mt-2 hover:bg-base-200 duration-300 hover:text-primary-content">
                    <img
                        src={radio.img}
                        alt={radio.name}
                        className="border-2 h-24 w-24 border-primary avatar avatar-sm rounded-full"
                    />
                    <h2 className="text-primary font-[ar2]">{radio.name}</h2>
                    <audio controls autoPlay key={radio.id}>
                        <source src={radio.url} />
                    </audio>
                </div>
            )}

            {radio && radio.id == "19" && (
                <div className="flex flex-col items-center border border-base-200 rounded-lg p-4 hover:border-primary hover:scale-105 mt-2 hover:bg-base-200 duration-300 hover:text-primary-content">
                    <img
                        src={"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSExIVFRUWFxcYFxUXFxUVGBcWFxYWGBcXGBcYHSggGBslGxUVITEiJSkrLi4uGB8zODMsNygtLi0BCgoKDg0OGhAQGysmICYtLTIvLTAtNS0tLS0tLTItNS0yNy0tLS0tLSstLS0tLS8tLSstLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAQUBAAAAAAAAAAAAAAAABQECAwQGB//EAEYQAAIBAgMEBwUEBwUIAwAAAAECAAMRBBIhBTFBUQYTImFxgZEyobHR8EJSssEUI1NigpLhBzNyc3QVFiRDosLS8TQ1w//EABkBAQADAQEAAAAAAAAAAAAAAAABAgMEBf/EAC4RAAICAQIEBAUEAwAAAAAAAAABAhEDEjEhIkFhBFGBoRRCscHRE+Hw8SNxkf/aAAwDAQACEQMRAD8A9xiIgCIiAIiIAiIgCJixFSwmKniufqIBtRLUcHcZdAEwYiuFH1pGIrhR9aSLJNQ8lG87vr8vHcBI4bFX0O/hNqQYbW3ofr6MkcJib6HfANuIlGYDeYBWJq1saB/XSW4PF5mIPiIBuREQBERAEREAREQBERAEREAREQBERAERMdZrCAaG0KvAcdB9eJHrNN6yq2QOM1gcpN2I5238JfVe7dw+O75+onG7ZwNaszHqdWY2ZsgVRYKjZgc65QCbKRcnXSDPJNxqlZ2aYnn9fXlK4vba0Vu538hc+PhIzY+BZKao1R3CDWo5ux53J9w4SI6Ybfp0gKSIr1NCFYXCD7z8deXr3VmpVy7l9UYq57HSpXFWzAkIRcEggsOFr/Q8d0Z0lqVCuRUY0rdrJqTyVlBDZOdtSJE7L6c027NZDTP3h20+Y9LTpaFanVUMjBhwKkMP6e6WKXHIqizm+jVWuCUamww9gabP2WU8UVSSzU+V9R3zp0raEngLk6++3GYcRXo0lLOwA4sxyr6nf75zO1enaDs0UNTv9hPmfIWh8dgnHGqkzr8Ht9KgIVtV3gixtwNuXfKtWdtw8z9fC85nojtmlXBQolOuNWAFs4+8p36cuHx6HFFmQrmKkjRl0IlY6q5ty+uMlcNjHUZA2RqgzkEhbgNYbyBvsL+E2KdWxDev5/XdOFxGAxNOolSnhyzo6ksppWZQGWp2mOds6tezXsQLWna0jvHp9eFvQy5THNy3VHQg31lZp7Mq3W3FdPLhNyQaCIiAIiIAiIgCIiAIiIAiIgGpiK2W+ukwfpo+97xK7Q3Hz+BkLtrajUrZVU6EnMX+8qgAIpJN2HCCspKKtkz+nD73vEjNt7SrKo6lcxN7ki4HLUHTjIzYe1KuIDlkVctRkUqxYPkNmIJA0zaR022h1OGKKe0/6tfFtWbyW585WcW1V0THJFLX0JhDTtq1zx1W1+4X3R+q5+9Z40mDX7o9BLxhE+6PQS1HF8b29/2PQulfSUUB1VKxqEacQg+83M8h5+Hn+UkliSSTcsdSSeJlyUgNwAl5knNmzvIywpLsPUem2am7I3NTa/jwPgZSCZJim1sW4lnqNmqOztzY3t4cF8pZkmS8tglyb3LEJVgykqym4YaEET0Xoz0jXErkqWWqo7Q3BwPtL+Y4TzyYqlMHQgGKNcOZ42exF6fP/qWBUQbiP5lni5wq/dHoJjfCr90egjSdPxvb3/Y9j2XtCqHcOhUWGVgLKdTcXOhOotJP/aJ+971nO9ENo9fhUJPbp/q2PetiremUyV2ptBkRWVVN2CnMxULmNgSQDpfSZxi4qm7O15Ita+hu/wC0T973rL6eObMovvI5bjfl4TmNjbeqV6r02RFyqjBlZze9R6ZBDqpBBptwk7R9qn/B8DLNCMlJWjoYiIJEREAREQBERAERMb1gIBpbQ4+fwMgNo4AVmFy+gIIUlcwJGhI1tpwm1tvajLUSmqXDMuY6myk2bdu0vqZF7S6Y4ajdUOdvu07N6ueyPeZWM1JtLoRkSUefYl9n4FaIAChVUWVR+Q855/0yx/W4koD2aQy/xtq/5DyMt2j0pxNbRSKSngurEd7n8rSJVeJ1J1JOpJO8k8TLnB4jxEZR0xLhKXgmUg4RKXi8peSAZbeVlLwBeUvKXlDJJBMoYMoTJAJlrSplLwCe6BbQ6rE9UfZrDL/Gtyv/AHDzE9Br0A6sjAMraEfH4XnjuoNxcEEEEEggg3BB4GTmzemWJpaVLVl/e7L2/wAQ3+Y85DR2+HzxUdMjstnbFWjVeor1Gzqi5XYvlCsSACdQO0dDJmh7VPxT4GQOy+luFr2Utkf7lTsn+Ftx8AZIYXaF8R1RW2UZgb7wpAtb+Ia90ylNRaT6nfjSceTY7CJr0sWrcbHvmxLEiIiAIiIAmGtXCzNNbGJx8jANStjb6C5PITWqOx3mw+vrjFRiAyrYHW2mlzxI8fjOEp1mq4zDks7srMzXckIopOr3QALT/WGw4kC95KM5z0tLzO6H92e+/wCGeMYFewvgPhPZl/uvI/hnjmB9hfAfCQcvjfl9TZtKEwZSSeeUi8GUkgGWsYiSSUgykoYAvLZWUMkFAYiWmACZSVMtkgXlCIMtEA18QuhnuBpgut/C/G2Um3hcDTuniWI3Ge3E9pfL8LSszv8ABfN6F1SmV7x9eRl9DGsul/I6+6cl0jxr0nqOjsr+0BmFm7ChAKbAipd7qbWIuDOgwhcqvWWzBQXsLLmA1tfcL/Ayh1Qyam15E9htoBiFOhO62s3ZC7FpZnaoeGg8Tv8AyHlJqDQREQBLXW4tLogELi0930fn5TQwmAQM7BQuY5nPM/XDzkjt6v1SM4F7Dd38L905HpB0q6ujTWmtqtRAQCDZAd7m+/W9ue/wrrWrT1Ilyx1vYzdK+kooDqqVjUI3cEB+03fyHr3cDRSwAHAS1bkliSzE3JOpJ5mZby55OfM8jEoYMoZJgJbBM38ZsetSRalRQgbcGZQx/gvm92kFkm9jQls36Gx6zrTdVBWq+RDmUXYX036eydTNPFUWpuyNoykqRv1BsdeMkOLSsxkyk2hs+oaJxFv1YbITcXzWBtbfxmSlgL4Z6+VjlcLmDIFBOWwKkZjv3g8RygaWaBlJWmhYhRvJAHiTYSRx+wcRRV3dAFpsEY5lNmZVYDQ66OvrJCi2rRFmDJSh0fxDmkFQXrIXp9pdVWxJ36e0NDIl5IcWtwZQmS1Xo7iVVnKCy01qntLojZrHf+6dJD3gOLW5WUm0mzqhotiAP1auEJuLhjY2tvPtCUxuzqlJaTuAFrLnQ3Buumthu9ob5I0s0qgnpfRbpKuKXI9lrKNV3BwPtL+Y4TgMbs6pSSk7gBay5kNwbjTgN3tDfNEVGVgysVZTdWGhBkNWbYsrxSPZcVhEqZc6hijBk/xDUf8AqZGNl5lveOHqT75z/RnpMMVTZXFq1NbsANGA+2vLXeOEn9hVxXZXIygE6cCV007t/wBCYOSUtPU9WFSjrWx0WAoZEC+vid82IiWJEREATBiK4UfWkYiuFH1pIy5qHko48/r3eO4Cytepe47I3g/aPK31bx3cv/aFs7PSWsu+kdf8t9/obHwvNvaHSTLWpogUUCwRnv2iWuqOq8KYcBc3EnukxUprUpsjC4IKkfutcEfH0iupm2skXFHkSGTXRbZ6V6xFS5REZyAbXy2Frjdv90ia+HalUek29GK+Ntx8xY+c6LoIR19S+7qXvbfa6Xljy8cf8iTMfSWhQFHDVaNLqxVDkjMzbstr3PefWUx+z6SjAZUA65VNTU9q5p346bzutvklg9u06jU8PQpURTVSFbFa2sLnUE2vYeMsxLHEVcKalTDU1RTU7DEBVVqZKEHQNusO4wbOMXbXb7FMKcLhdoVw+WmiKOquGcK5Wmbjeb6tMG09mpiRVrU8Ya9RFLsrIV7Avou6w36AfGZNq9LV658mHw9Rb2Dul2YAAXJ8tO601qfTN1vlw2HW4sbIRccjY6jugOWPjFvhb6MkNiH/AIfAf6pv/wBZzu1cM1XHVKa2u9dlF91y5Av3TbxHSuoxpWo0kFKp1iqoIBNmFiL7u0d00MJtEHFriH0BrCo1r2Azgm3HSSUnKLSjfl9KL8DgCuMTDVbMBWVHUE5TqAeRk5tKgtPB41EFlXFgAa6AGlprM7bJT9M/S/0vDdX1oqWzjNlve3K/nITH7Y61q+HTJ1dfEZxUa4t2lAPcvZB3cYLaVCLT71/wybQ2XSy7PCjIa6jrGudSxpjNqbA9o7pK7Y2fhRQxapQZXw/V9t3dixcjtWJtuB/pMe1ekCYZaGHprQxJp0wrOwzgMLCynyv6TVq9PqzAhqFBgd4IYg+IJ1jiWvHG0/p2/JN7G/vNm/6ar+GlPPKdFnqCmguzNlA5kmwk6/TGr1tKqKVIGkrqqgMFs+W+l+GUWtIfZm0DQrLXVVYqSQrXtcgjgeF5KRlknGVK+v2S+x1dXYWFp0MUhZ6uIoUQztmYIrMGKqoBsbW433+UjsLhMJh8JSxGIpNXeuWCqHKKgUkakHU6cb+4zS2Z0lqUXrv1aVDXN3Dgkb2O6+7tnfJA9OamXJ+i4bINQuQ5b88t7RTLqWN8dvS+v4MOC/8AqK/+pT8NKX7NwuFxlBqaU3p4ijRz585ZamUDN2SbLc23Dj5SNbpAxp1KXV0wtSsK5ABsCCvYAvbL2Bp3mSP++7gMFw2GTMpUlEKmx7wZPErGUOFvhVbf7MfSs/8AC7O/yD8KU5VzJ3blWsaGEWoiqq0rU7B7lTlsWJGW5AB7J8bSIweEavVSiu92C35DifIXPlJWxSfGfDt9Dvf7PdndVhmrn2qx0PKmtwPeWPeLTqqdDqwosByA4E62+t/xto0FXJSUWRAAByCgAD8PqZHY7b4SqwqACjfLnvqpFgWcfsyxy5uBExfFnpqscVFnV4DG5uy2/nzm/OYDf0MmNn43N2W38+cGpvxEQDVxeHvqN/LnI5gRu9Prj8fjNzUxeGvqN/LnAOIxmwb1qbAjqVbrDTI1zrfIFP3Cxvl4Ed8nMRXWjRaox0ALE/urr7/+6ZcSFAzMQo4k8NbX7jOS/tF2lZEoKf7w3P8Alp82t4gGL6GbrHFyRxzV2qM1Rvadix7r8PIWHlJDA7XejTqU0CjrRZnt2gtiCFPC95GJLpY8jU7sGUMqZbeSVBmxh9nVagDJTdlLZQQpILWvl8bTVnX9GNk1ClNqmJejTqPejTQ2Z3APaF7gaA62OnLS4vjhrdHJVEKsVYEEEgg7wQbEHzlk6GhspKlTHl2cmgtZ1NxcsrPq+mu7umTor0fTEU6tWqlUqtsnV2BY65wAR2iOz6xZKxSbpfyjnKNFnYIqlmJsABck8gJemBqsXUU2LUwxcAG6hTZsw4WM6vA7KopXweJw7uadWqVy1AMysuYHcBp2W9O+YcFhA+Kx9RqtSlSptVNTq/adWqP2dx07Jv5SbLLDtf8AOFnN1Nn1Q60jScO1iqWOYg3tYeRltXAVVVnNNgqsUZiLAON6k8D3Tsa+HRcdgKiPVcVVDA1WDMFsSo0Gmjbph25/8LF/6+p8RFlnhVPt+LOLRCxCgEkkAAbySbADzl2JotTYo6lWXQqdCNL6iZqGErCmcSqnJTcDOCBlfQjS976rraSLYMVcFWxlRnasKypcm4IITU6XJ15yTFRte/oQRidxs/ophcqU6r1TXeh19lKhFXQWuQSTdgO+x3ThAdJKdkzxuFWVlLwTKSShc9ViACxIG4Ek28OUrhMY1CqlZd6MGtzHEeYuPOYjMbwWTp2e3Ua6sFqIbq4BB5hgCD8PQyIxexBUqkuQaN8wp/ea97Od5QNc5eJMjf7Otp9bh2oN7VE6DnTe5X0IYdwtOnSuMoYENfdbjwv4/XOYPg6PXVZIqRcSFHfwHLhu/L+pknsrZ5B6x9/Acu898bL2d/zKm/gOXee+S8GgiIgCIlrtYEwCG6Q4dXRlvYkb+/vnMbb6KpWopk0rU1Cqx+0B9h+Wu7l8emrNmcDzP16DwM10x1OozhGDFGyuOII5/kfKVUVq1dSJ1KOh7HkDIyMUdSrKbMp3gy6eidKOj64lc62Wqo0bgwGuV/yPD4+bUqlwCOImiPJzYXjZkYyl4vKEyxiUYTsf978PekxwhLURlpnrPZFgNBa24CcdLbxReGSUNjtdgOFTGY2qg6msHAQsLuWdrp78t++W4bpnQphFTBlRTLFAKuilr5uGvtHfznGFj5DdLbxRdZ5JJROrxHSymTQ6vDlFo1Wq5c98xYNmG7S5cmZsP0xw1N3qLgiGqXznrL5rm5uCLHUnhxnGmUvFD9ea/o7NumWGLU3/AELtUgBTIqWyDgAAtrSHx+3xUoVaPVkdbiGr5s24Nbs2tru3yDJlsmiHmm9zruj2DfEbPr0KVmq9cr5SQOzZNdf8Lek36OHGAwDpjKKvnrArSzjtDKut15ZSfTnOCDkG4JB5g2h3JNySe86/GKJWVJbcao9DxXSHAqf0hKhNQYbqVoBXsLkNqxFtCAL9x3zzgCVJlDJSorkyOe4vLQZW8peWMyhltOi9RlRFLMxsqjeTKVGnqXRfo6mDTMbPXcWLDXKD9hO7v3n4Vk6N8OJ5GWdHuja4Sk2Y5q9RbMRey/uL3X47z8J/YGCSkyqTm3kE7sx1uB6zKalOhlNVwKlQ5UB17R4D3XPgJa2m7gbj8vl5TncU5aup6sajHQtjp4mLC1s6huYmWWJEREATU2hVsLec25qYvCFtQfKAQ+YhWItm1tfcCL2vyF7+VpxlGnUp4vDg06iEsUZsoyMnVuWBqKe3eoA9mFwSbTuq1Jl9pfP+o/pMJpjgfrx4yUZyhqafkUJ/V+v4Z4tgj2F8B8J7S+iEcbHTuy754jgn7K+A+EmJy+N+X1N1pQmUDQZY4ChMXlJSSBeUJgmWtAK3lDKQZIKXlCZWWGAXXlpMCUvJAJlLwZbJBW8tBlZaTAMdc6Ge7IbOn19lp4JiH0M93ZrMvPfbjaxF/DUeszyHf4L5vQ53pPTqValRaaM77lIAsllRqZ6xj+rAcFjbUyew7sVUvbMQMwBuMxGoB4i/xmR/3j5bz8h6ecUgzn9WhPf/AFP9ZmdUMelt+ZJ7FralD4j8/n5yWkVs/ZjKwdm15D5yVg0EREAREQARNWtgEbdoe75TaiAcntjZZ6xHD6owJFjqoNyPS/dNLavRrC1756eR/v0+w3iRax8SJ0G1N58/wzS2ptFaZAZHa4JJUZiACBfKNeI3SsYqLbXUjJJOPPsef7T6E4in2qLCsvL2X9CbH18pzpuCQQQQSCDoQQbEEcDPYMLiEqKro2ZWFwwv/wC+BGs866dbP6rE9YPZrDN/Gtgw+B8zNUzg8Rgio6okGZSAZS0scQEpEtkgXlJUy2AJQmDKSQDKGUMGSAZSUMoxgBQWIVQWZiAAASSSbAADeZ0uyugeJqdqsRQXke29vAGw8z5Sv9nOzesxBrt7NEaf42BA9FzHzE9JATI1Wq2VF+Hx36aa6SkpVwR24MEXHVIg9ldGcHh7FafW1Bud+2fEC1h4qJvUcAxr9ZmsXGUDXQNZt/8ACJdgNt06tV6NOnUTIqPmdcmYMxUEA9q3ZOpm9hvbpeK/AzCcFJpy6HfjaUeTZkphtj011btHv3ekkVUDQC0rEsSIiIAiIgCIiAIiIBDbU3nz/DIbbOBarbKyiwIOZXI9pWB7JBFio4yb2kjZtEJ8rjd4zV6up+zP8o+cFZRUlTIfYWz6lBXV6gfNUZ1yoUC5zdgASdM2vmZr9NdndfhWKi7p+sXxXRl81uJ0HV1P2Z/lHzmhtXCV2AKHIRzuoPkt7ys5OKtKyVji1o6Hji1Zf1s9sRnIvlH/AE2v3XO6C7/d/D/5TXWcXwXf2PEw8qTPS+lXR1cWudLLWUdltwYD7D/keF/XzGqrIzI4KspsyneDLJ2c2XC8bLryhlheZ8Bg61dstGmznjYaDxbcvmZYyUW9jFLSZlx2Fq0Wy1qbIeGYaHwO5vIzWzwGmty+8sZ5WjTao6oilnY2VRvJ+vhPUei/R1cGmZrPiHFmI1Cg/YTu7+JHpDlRtiwvIzys1JierPeWDj7H4f8Aylhdvu7/AA/Iyv6h0/B9/Yheiuzf0bCU0ItUqdtx+89tD4DKvlJfamHZ0VEYDKyt2lLAldRexF9dZqYDC1escsTU5C5YLqb6EgA7pI9RU/ZH+UfOYxk5K2qOyWOKWjoQexNiPQqPUZ1bMqIFVXWwWozkkuzEkl2O+TeF9ul4r8DHUVP2R/lHzmXC4eoaiEoQARwFra9/fLNiMVFUjooiIJEREAREQBERAEREAREQBNfHUsynu1mxEA56k+U9x+vhf0E5La21K1JmHXtnUtZCFYPaxRerVM5DA2zA6ETsMfRysbeXxH13TUNEXz2ANrZiLG3K+/4QZ5IOVU6MOAxJqIrmm1NmFzTf2h3H8j6yF6XbCpYhQ+dadUWAc7mW/svbW2/Xh8egzKNAMx+uHzl1bZD1h200HDcT3C26Vk5Jcu5fTGXCexy+zOhOFo61mNduR7NP+UH8RM6ejSIUKiBFG4ABQB3C35ecrhqYpWCqAALAcgOV935/GP6R1KmXMGbqrHMFuLHgzFe0U5gEES1t7lGo41yo3cRSDKUqIrqd4IDA+II/KcrtboJh6vaoOaLcvbQ+RNx5Gw5Tc6NNiCWdnY0LAU1qdpieLhj2lp33BiSdJO1gAO0Lki1vnbefrvku1sNMci5kc/0S2NRwqkh1q120Zh9kX9lRvA3a8T3buoI6lGqFS7geyup8B+Z9JhwexmpqWVB2tTxa3AGXZraai3A/Lh7pSLk1zbl9MYqobHJYjauJq1kRMSwZ3XMF6vKqAM1XsMmdcoCqCx1JJ4Tqy+9vTxPyFvQyx6K5s+QFrWzAAmxtcX32NhzmRKWd1p+vxP13y5THBx3dkvsPD5aeY7218uAkjKKLC0rINBERAEREAREQBERAEREAREQBERAEREA0tp4csLqLndNOjshjrUbyHz+UmYgGDD4RE9lQO/jM8RANHH4LN2l38uchmFvzH1xnTzRx+Czdpd/Ec4BBsQo7+A5fXL+sk9l7O/5lTfwHLvPfGzNmEHPU38By7z3yXgCYq+HV/aUGZYgETX2SRqjeR+fzldkYJlZncWO4eHGSsQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREA/9k="}
                        alt={radio.name}
                        className="border-2 h-24 w-24 border-primary avatar avatar-sm rounded-full"
                    />
                    <h2 className="text-primary font-[ar2]">{radio.name}</h2>
                    <audio controls autoPlay key={radio.id}>
                        <source src={radio.url} />
                    </audio>
                </div>
            )}
        </div>
    );
}
