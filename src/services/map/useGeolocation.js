import { useGeolocationStore } from '@/stores/geolocation'


export const useGeolocation = () => {

    const isSupported = 'navigator' in window && 'geolocation' in navigator
    const geolocation = useGeolocationStore()
    let watcher = null

    if (isSupported) {
        watcher = navigator.geolocation.watchPosition(
            position => {
                //   console.log(position);
                geolocation.change(position.coords.latitude, position.coords.longitude)
            },
            err => {
                console.log(err)
                geolocation.decline()
                if (err.code === 1) {
                    alert('Bản đồ không có quyền truy cập vị trí.\nKiểm tra lại trong cài đặt.')
                    navigator.geolocation.clearWatch(watcher)
                }
            }
        )
    } else {
        alert('Vui lòng sử dụng phiên bản Browser mới nhất!')
    }


}