import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    notificationService } from '@hope-ui/solid';
import { Link, useNavigate } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component } from 'solid-js';
import { InferType } from 'yup';
import Title from '../../../../atoms/Title';
import createAlert from '../../../shared/hooks/createAlert';
import preventEnterCharacter from '../../../shared/utils/PreventEnterCharacter';
import userEditPasswordSchema from '../../validations/schemas/userEditPasswordSchema';
import styles from './UserEditPassword.module.css';

interface EditPasswordTemplateProps
{
    editPasswordAction?: any;
}

const UserEditPassword: Component<EditPasswordTemplateProps> = ( props ) =>
{
    const { t } = useI18n();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show( {
            status: 'success',
            title: t( 'au_password_updated' ) as string,
        } );
        navigate( '/users', { replace: true } );
    };

    const handleError = () => ( error: unknown ) =>
    {
        const errorMessage = setError( error );
        notificationService.show( {
            status: 'danger',
            title: t( 'err_save_password' ) as string,
            description: t( errorMessage ) as string,
        } );
    } ;

    const {
        errors,
        form,
        isSubmitting,
        isValid,
        // @ts-ignore
    } = createForm<InferType<typeof userEditPasswordSchema>>( {
        initialValues: { },
        extend: validator( { schema: userEditPasswordSchema } ),
        onSuccess: handleSuccess,
        onError: handleError,
        onSubmit: values => props.editPasswordAction( values ),
    } );

    return (
        <div class={styles.container}>
            <section class={styles.section_title}>
                <Title class={styles.title} titleType="h1">
                    <Text message="a_change_password" />
                </Title>
            </section>
            <form ref={form} class={styles.form}>
                <div class={styles.field_wrapper}>
                    <FormControl required invalid={!!errors( 'password' )}>
                        <FormLabel for="password"><Text message="new_password"/></FormLabel>
                        <Input name="password" type="password" placeholder={t( 'a_password' )} />
                        <FormErrorMessage><Text message={errors( 'password' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>

                <div class={styles.field_wrapper}>
                    <FormControl required invalid={!!errors( 'passwordConfirmation' )}>
                        <FormLabel for="passwordConfirmation"><Text message="confirm_password"/></FormLabel>
                        <Input name="passwordConfirmation" type="password" placeholder={t( 'a_repeat_password' )}onKeyDown={preventEnterCharacter( [ 'Space' ] )}/>
                        <FormErrorMessage><Text message={errors( 'passwordConfirmation' )[0]} /></FormErrorMessage>
                    </FormControl>
                </div>


                <div class={styles.container_buttons}>
                    <div class={styles.button_close_save}>
                        <Button as={Link} href="/users" colorScheme="neutral">
                            <Text message="a_close" />
                        </Button>
                    </div>
                    <div class={styles.button_close_save}>
                        <Button type="submit" disabled={!isValid()} loading={isSubmitting()} loadingText={<Text message="a_submitting"/> as string}>
                            <Text message="a_save"/>
                        </Button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default UserEditPassword;