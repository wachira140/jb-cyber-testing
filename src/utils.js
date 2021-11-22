

export const uniqueValue = (data, type)=>{
   let unique = data.map((item)=>item[type].toLowerCase())

    return ['all', ...new Set(unique)]
}


export const pickUp = (location, courier)=>{
    if(!location){
        return null
    }
  const towns=  location.filter((loc)=>loc.name ===courier )
  const offices = towns.map((office)=>office.pickup)
    const specificOf =offices[0]
    return ['choose pick up', ...new Set (specificOf)]
}

export const formatPrice = (price)=>{
    return new Intl.NumberFormat('en-KE',{
        style :'currency',
        currency:'KES',
    }).format(price)
}
// calculate transportation

