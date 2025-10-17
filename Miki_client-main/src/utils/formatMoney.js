export const FormatMoney = ({ money }) => {
   return (
       Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money)
   )
}