import { notificationService } from '@hope-ui/solid';
import { useNavigate } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component, Show } from 'solid-js';
import { permissions } from '../../../../config/permissions';
import { PermissionApi } from '../../../auth/interfaces/permission';
import { CategoryApi } from '../../../category/interfaces';
import createAlert from '../../../shared/hooks/createAlert';
import AlertErrors from '../../../shared/molecules/AlertErrors/AlertErrors';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import { ProductApi, ProductPayload, ProductResponse } from '../../interfaces';
import ProductForm from '../../organisms/ProductForm/ProductForm';

interface ProductUpdateTemplateProps
{
    permissionsList?: PermissionApi[];
    categories?: CategoryApi[];
    onUpdate: ( data: ProductPayload ) => Promise<ProductResponse>;
    productSelected: ProductApi | undefined;
    loading: boolean;
}

const ProductUpdate: Component<ProductUpdateTemplateProps> = ( props ) =>
{
    const { t } = useI18n();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show( {
            status: 'success',
            title: t( 'r_updated' ) as string,
        } );
        navigate( '/products', { replace: true } );
    };

    const handleError = () => ( error: unknown ) =>
    {
        const errorMessage = setError( error );
        notificationService.show( {
            status: 'danger',
            title: t( 'err_save_product' ) as string,
            description: t( errorMessage ) as string,
        } );
    } ;

    return (
        <section class="section_container">

            <AlertErrors
                errorData={errorAlert.errorData()}
                title="err_save"
                description="err_save_product"
            />

            <header class="section_header_container" data-parent={permissions.PRODUCTS.UPDATE}>
                <div class="has-permission">
                    <h1 class="section_title"><Text message="r_update" /></h1>
                </div>
                <div class="fallback">
                    <h1 class="section_title"><Text message="Product" /></h1>
                </div>
            </header>

            <Show when={!props.loading} fallback={() => <GeneralLoader/>}>
                <ProductForm
                    onError={handleError()}
                    onSubmit={props.onUpdate}
                    onSuccess={handleSuccess()}
                    permissionsList={props.permissionsList}
                    productSelected={props.productSelected}
                    requiredPermission={{ submit: permissions.ROLES.UPDATE }}
                />
            </Show>
        </section>
    );
};
export default ProductUpdate;
