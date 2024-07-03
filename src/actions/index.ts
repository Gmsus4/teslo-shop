export { getProductBySlug } from './product/get-product-by-slug'
export { getPaginatedProductWithImages } from './product/product-pagination'
export { getStockBySlug } from './product/get-stock-by-slug'
export { login, authenticate } from './auth/login'
export { logout } from './auth/logout'
export { registerUser } from './auth/register'
export { getCountries } from './country/get-countries'
export { setUserAdress } from './address/set-user-address'
export { deleteUserAddress } from './address/delete-user-address'
export { getUserAddress } from './address/get-user-address'
export { placeOrder } from './order/place-order'
export { getOrderById } from './order/get-order-by-id'
export { getOrdersByUser } from './order/get-order-by-user'
export { setTransactionId } from './payments/set-transaction-id'
export { paypalCheckPayment } from './payments/paypal-payment'
export { getPaginatedOrders } from './order/get-paginated-orders'
export { getPaginatedUsers } from './user/get-paginated-users'
export { ChangeUserRole } from './user/change-user-role'
export { getCategories } from './category/get-categories'
export { createUpdateProduct } from './product/create-update-product'
export { deleteProductImage } from './product/delete-product-image'
export { getProductByName } from './product/get-product-by-name'
export { uploadImageUser } from './user/update-profile-image'
export { getProfilePicture } from './user/get-profile-picture'
export { deleteProfileUserImage } from './user/delete-user-image-profile'
export { getCodigoPostal } from './address/get-data-codigo-postal'
export { createNewAddress } from './address/new-address'
export { getAllUserAddressById } from './address/get-all-user-address-by-id'
export { getUserAllAddress } from './address/get-user-all-address'
export { updateAllUserAddress } from './address/update-user-all-address'