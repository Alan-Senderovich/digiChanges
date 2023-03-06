import { IconButton } from '@hope-ui/solid';
import { Link } from 'solid-app-router';
import { Component } from 'solid-js';
import IconPencilAlt from '../../../../atoms/Icons/Stroke/IconPencilAlt';
import IconTrash from '../../../../atoms/Icons/Stroke/IconTrash';
import Card from '../../../shared/molecules/Card/Card';
import CardContent from '../../../shared/molecules/CardContent/CardContent';
import { ProductApi } from '../../interfaces';

interface ProductCardProps {
    product: ProductApi;
    onDelete: () => void;
}

const ProductCard: Component<ProductCardProps> = ( props ) => (
    <Card>
        <CardContent class="card_container">

            <div class="card_media_object">
                <h6 class="card_media_object_title" data-parent="productsShow">
                    <Link class="card_media_object_link has-permission"
                        href={`/products/${props.product.id}/update`}
                    >
                        {props.product.title}
                    </Link>
                    <span class="card_media_object_span fallback">
                        {props.product.title}
                    </span>
                </h6>
                {props.product.title}
            </div>

            <div class="card_third">
                <div data-parent="productsUpdate">
                    <div class="has-permission">
                        <Link href={`/products/${props.product.id}/update`}>
                            <IconButton
                                aria-label="Edit"
                                variant="ghost"
                                icon={<IconPencilAlt />}
                                compact
                                colorScheme="success"
                            />
                        </Link>
                    </div>
                </div>
                <div data-parent="productsDelete">
                    <IconButton
                        class="has-permission"
                        aria-label="Delete Product"
                        variant="ghost"
                        icon={<IconTrash />}
                        compact
                        colorScheme="danger"
                        onClick={props.onDelete}
                    />
                </div>
            </div>

        </CardContent>
    </Card>
);

export default ProductCard;
