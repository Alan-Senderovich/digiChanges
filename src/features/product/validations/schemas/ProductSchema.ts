import { bool, number, object, string } from 'yup';

const productSchema = object( {
    title: string()
        .min( 1, 'av_too_short' )
        .max( 50, 'av_too_long' )
        .required( 'av_required' ),
    enable: bool().required(),
    price: number().required( 'av_required' ),
    category: string(),
} );

export default productSchema;
