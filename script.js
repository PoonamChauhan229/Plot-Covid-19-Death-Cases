let url=`https://api.covid19api.com/summary`

updateMap()
async function updateMap(){
    let data=await fetch(url)
    let res=await data.json()
    // console.log(res.Countries)
    let list=res.Countries

    list.map(async function(element){
        // console.log(element)
        // console.log(element.NewConfirmed)
        // console.log(element.Country)
        console.log(`Loading`)
        let data1=await fetch(`https://restcountries.com/v3.1/name/${element.Country}`)
        let res1=await data1.json()
        // console.log(res1[0].latlng)

        let latitude=res1[0].latlng[0]
        let longitude=res1[0].latlng[1]


        let cases=element.TotalDeaths

        if(cases>255){
            color="rgb(255,0,0)"
        }
        else if(cases>100 && cases<255){
            color="rgb(168,23,62)"
        } 
        else{
            color=`rgb(${element.TotalDeaths},0,0)`
        }
        // Mark on the map

        new mapboxgl.Marker({
            draggable: false,
            // color:"red"
            color:color

            })
            .setLngLat([longitude, latitude])
            .addTo(map);


    })

}
let interval=9000
setInterval(updateMap,interval)