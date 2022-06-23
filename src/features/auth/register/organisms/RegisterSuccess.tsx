import { Button } from '@hope-ui/solid';
import { Link } from 'solid-app-router';
import { Text, useI18n } from 'solid-i18n';
import { Component } from 'solid-js';
interface RegisterFormProps
{
    email: string;
}

const RegisterSuccess: Component<RegisterFormProps> = ( props ) =>
{
    const { t } = useI18n();
    return (
        <div>
            <section class="flex flex-row justify-between items-center mt-6 mb-2">
                <Text message="au_we_building" class="text-2xl dg-form-label pl-2" />
            </section>
            <div class="flex flex-wrap text-sm">
                <div class="w-full mb-1 pr-3 pl-2">
                    <span class="w-full text-xl text-bold ">{t( 'au_check_your_box' )}</span>
                    <Text message="au_can_log_in_with" class="dg-form-label text-2xl text-bold pb-2 pt-10" />

                    <div class="w-full mb-2 mt-2">
                        <span class="w-full text-xl text-white text-bold">{t( 'email' )}: </span><span class="w-full text-xl text-bold ">{props.email}</span>
                    </div>
                    <div class="w-full mb-2">
                        <span class="text-xl text-white text-bold">{t( 'password' )}: </span><span class="text-xl text-bold ">{t( 'a_your_password' )}</span>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-center pt-10">
                <Link href={'/login'}>
                    <Button><Text message="au_go_to_login"/></Button>
                </Link>
            </div>
        </div>
    );
};

export default RegisterSuccess;