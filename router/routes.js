import {LoginComponent} from '../components/Login-component.js'
import {LoginUserErrorComponent} from '../components/Login-user-error-component.js'
import {CreateUserComponent} from '../components/Create-user-component.js'
import {CreateUserLoginComponent} from '../components/Create-user-login-component.js'
import {CreateUserSuccessComponent} from '../components/Create-user-success-component.js'
import {CreateAddressComponent} from '../components/Create-address-component.js'
import {HomeComponent} from '../components/Home-component.js'
import {PanelComponent} from '../components/Panel-component.js'
import {ProductsComponent} from '../components/Products-component.js'
import {SearchProductsComponent} from '../components/Search-products-component.js'
import {SearchStoresComponent} from '../components/Search-stores-component.js'
import {OrderItemComponent} from '../components/Order-item-component.js'
import {OrderItemsComponent} from '../components/Order-items-component.js'
import {UpdateUserPasswordComponent } from '../components/update-user-password-component.js'
import { UpdateUserPasswordErrorComponent } from '../components/Update-user-password-error-component.js'
import { YourProfileComponent } from '../components/Your-profile-component.js'
import { UpdateAddressComponent } from '../components/Update-address-component.js'
import { UpdateAddressSuccessComponent } from '../components/Update-address-success-component.js'
import { AddNewAddressComponent } from '../components/Add-new-address-component.js'
import { SelectListAdrressComponent } from '../components/Select-list-address-component.js'
import { CheckLoginComponent } from '../components/Check-login-component.js'
import {CreateOrderSuccessComponent} from '../components/Create-order-success-component.js'
import {OrderDetailComponent} from '../components/Order-detail-component.js'

$('body').append(jQuery('<script>',{id:'login-template',type:'text/x-template',src:'/templates/login.html',}));
$('body').append(jQuery('<script>',{id:'check-login-template',type:'text/x-template',src:'/templates/check-login.html',}));
$('body').append(jQuery('<script>',{id:'login-user-error-template',type:'text/x-template',src:'/templates/login-user-error.html',}));

$('body').append(jQuery('<script>',{id:'create-user-template',type:'text/x-template',src:'/templates/create-user.html',}));
$('body').append(jQuery('<script>',{id:'create-user-login-template',type:'text/x-template',src:'/templates/create-user-login.html',}));
$('body').append(jQuery('<script>',{id:'create-user-success-template',type:'text/x-template',src:'/templates/create-user-success.html',}));

$('body').append(jQuery('<script>',{id:'create-address-template',type:'text/x-template',src:'/templates/create-address.html',}));
$('body').append(jQuery('<script>',{id:'update-address-template',type:'text/x-template',src:'/templates/update-address.html',}));
$('body').append(jQuery('<script>',{id:'update-address-success-template',type:'text/x-template',src:'/templates/update-address-success.html',}));
$('body').append(jQuery('<script>',{id:'add-new-address-template',type:'text/x-template',src:'/templates/add-new-address.html',}));
$('body').append(jQuery('<script>',{id:'select-list-address-template',type:'text/x-template',src:'/templates/select-list-address.html',}));

$('body').append(jQuery('<script>',{id:'home-template',type:'text/x-template',src:'/templates/home.html',}));
$('body').append(jQuery('<script>',{id:'panel-template',type:'text/x-template',src:'/templates/panel.html',}));
$('body').append(jQuery('<script>',{id:'products-template',type:'text/x-template',src:'/templates/products.html',}));
$('body').append(jQuery('<script>',{id:'search-products-template',type:'text/x-template',src:'/templates/search-products.html',}));
$('body').append(jQuery('<script>',{id:'search-stores-template',type:'text/x-template',src:'/templates/search-stores.html',}));
$('body').append(jQuery('<script>',{id:'order-item-template',type:'text/x-template',src:'/templates/order-item.html',}));
$('body').append(jQuery('<script>',{id:'order-items-template',type:'text/x-template',src:'/templates/order-items.html',}));
$('body').append(jQuery('<script>',{id:'update-user-password-template',type:'text/x-template',src:'/templates/update-user-password.html',}));
$('body').append(jQuery('<script>',{id:'update-user-password-error-template',type:'text/x-template',src:'/templates/update-user-password-error.html',}));
$('body').append(jQuery('<script>',{id:'your-profile-template',type:'text/x-template',src:'/templates/your-profile.html',}));
$('body').append(jQuery('<script>',{id:'create-order-success-template',type:'text/x-template',src:'/templates/create-order-success.html',}));
$('body').append(jQuery('<script>',{id:'order-detail-template',type:'text/x-template',src:'/templates/order-detail.html',}));

const routes = [
    {name: 'item-pedido',       path: '/item-pedido',   component:OrderItemComponent,},
    {name: 'items-pedido',      path: '/items-pedido',  component:OrderItemsComponent,},

    {name: 'home-store',            path: '/empresa/:aliasStore/' , component:HomeComponent},
    {name: 'logout-store',          path: '/empresa/:aliasStore/logout' , component:HomeComponent},
    {name: 'login-store',           path: '/empresa/:aliasStore/login' , component:LoginComponent},
    {name: 'check-login-store',           path: '/empresa/:aliasStore/check-login' , component:CheckLoginComponent},
    {name: 'login-error-store',     path: '/empresa/:aliasStore/login-error' , component:LoginUserErrorComponent},
   
    {name: 'your-profile-store',                path: '/empresa/:aliasStore/your-profile' , component:YourProfileComponent},
    {name: 'create-user-store',                 path: '/empresa/:aliasStore/create-user' , component:CreateUserComponent},
    {name: 'create-user-login-store',           path: '/empresa/:aliasStore/create-user-login' , component:CreateUserLoginComponent},
    {name: 'update-user-password-store',        path: '/empresa/:aliasStore/update-user-password-store' , component:UpdateUserPasswordComponent},
    {name: 'update-user-password-error-store',  path: '/empresa/:aliasStore/update-user-password-error-store' , component:UpdateUserPasswordErrorComponent},
    {name: 'create-user-success-store',         path: '/empresa/:aliasStore/create-user-success' , component:CreateUserSuccessComponent},
    
    {name: 'create-address-store',              path: '/empresa/:aliasStore/create-address' , component:CreateAddressComponent},
    {name: 'update-address-store',              path: '/empresa/:aliasStore/update-address/:id' , component:UpdateAddressComponent},
    {name: 'update-address-success-store',      path: '/empresa/:aliasStore/update-address-success' , component:UpdateAddressSuccessComponent},
    {name: 'add-new-address-store',             path: '/empresa/:aliasStore/add-new-address' , component:AddNewAddressComponent},
    {name: 'select-list-address-store',         path: '/empresa/:aliasStore/select-list-address' , component:SelectListAdrressComponent},

    {name: 'panel-store',            	path: '/empresa/:aliasStore/panel' , component:PanelComponent},
    {name: 'produtos-store-by-group',   path: '/empresa/:aliasStore/produtos/:groupName' , component:ProductsComponent},
    {name: 'produtos-store',         	path: '/empresa/:aliasStore/produtos' , component:ProductsComponent},
    {name: 'buscar-produtos-store',  	path: '/empresa/:aliasStore/buscar-produtos' , component:SearchProductsComponent},
   
    {name: 'buscar-loja-store',                                             path: '/empresa/:aliasStore/buscar-loja' , component:SearchStoresComponent},
    
    {name: 'item-pedido-store',                                             path: '/empresa/:aliasStore/item-pedido/:id' , component:OrderItemComponent,},
    {name: 'edit-item-pedido-store',                                        path: '/empresa/:aliasStore/item-pedido/:id/quantidade/:amount' , component:OrderItemComponent,},
    {name: 'edit-item-pedido-aditionais-store',                             path: '/empresa/:aliasStore/item-pedido/:id/adicionais/:idsItemsGroupsAdditional/quantidade/:amount' , component:OrderItemComponent,},
    {name: 'edit-item-pizza-pedido-store',                                  path: '/empresa/:aliasStore/item-pedido/:id/tamanho/:idSize/sabores/:idsFlavors/borda/:IdBorderSize/adicionais/:idsItemsGroupsAdditional/quantidade/:amount' , component:OrderItemComponent,},
    {name: 'edit-item-pizza-pedido-less-border-store',                      path: '/empresa/:aliasStore/item-pedido/:id/tamanho/:idSize/sabores/:idsFlavors/adicionais/:idsItemsGroupsAdditional/quantidade/:amount' , component:OrderItemComponent,},
    {name: 'edit-item-pizza-pedido-less-aditionais-store',                  path: '/empresa/:aliasStore/item-pedido/:id/tamanho/:idSize/sabores/:idsFlavors/borda/:IdBorderSize/quantidade/:amount' , component:OrderItemComponent,},
    {name: 'edit-item-pizza-pedido-less-aditionais-less-border-store',      path: '/empresa/:aliasStore/item-pedido/:id/tamanho/:idSize/sabores/:idsFlavors/quantidade/:amount' , component:OrderItemComponent,},
    {name: 'items-pedido-store',                                            path: '/empresa/:aliasStore/items-pedido' , component:OrderItemsComponent,},
    {name: 'create-order-success-store',                                    path: '/empresa/:aliasStore/create-order-success/:id' , component:CreateOrderSuccessComponent},
    {name: 'order-detail-store',                                            path: '/empresa/:aliasStore/order-detail/:id' , component:OrderDetailComponent},
];

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});
