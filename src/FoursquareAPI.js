/// https://api.foursquare.com/v2/venues/4b8016ccf964a520145130e3?client_id=N50SSX52BMS1RCC1DXTGQHTB5U3RSRP4JGRJBAL5QZ3YRX43&client_secret=5BDSKVTXEURCHCHMJDABGER3FTEE3LZD5HAXD2WEO1RLMQAQ&v=20181029
const url = 'https://api.foursquare.com'
const CLIENT_ID = 'CX5YHC2KT4US3CNEUCVJRLQ1Z4TNTKP2IYKCPJFNNHWW3EWH'
const CLIENT_SECRET = 'OQU5CNIMZAEM51Y5KNQIPH0T0IPNA4XBDWG200ZFBODOUDAZ'
const VERSION = '20181105'

export const getRestaurant = (id) =>
    fetch(`${url}/v2/venues/${id}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}`)
//    fetch('https://api.foursquare.com/v2/venues/4b8016ccf964a520145130e3?client_id=0MUOG0YZ2VWLO0V1IAFNK25DGVQXPOFNJWT23BO5MRZN5GIK&client_secret=011BXBI1ENW1UME1C52BKCQRC4WS4SUW4GVM4GNC0LUBS0O3&v=20181029')
    .then(res => {if (!res.ok){
    return null} return res.json()})
