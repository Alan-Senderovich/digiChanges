
import { useNavigate } from 'solid-app-router';
import { Component } from 'solid-js';
import { Form } from 'solid-js-form';
import Button from '../../../../atoms/Button';
import Input from '../../../../atoms/Input';
import PasswordShowHide from '../../../../atoms/PasswordShowHide/PasswordShowHide';
import Title from '../../../../atoms/Title';
import { useApplicationContext } from '../../../../context/context';
import SignUpSchema from '../../../../SchemaValidations/SignUpSchema';
import { handleSubmit } from './handlers';

interface LoginFormProps {
    onClick: ( event: MouseEvent ) => void;
}

const LoginForm: Component<LoginFormProps> = props =>
{
    const [ , { addUser } ] = useApplicationContext();
    const navigate = useNavigate();
    return (
        <>
            <Form
                initialValues={{ email: '', password: '' }}
                validation={SignUpSchema}
                onSubmit={handleSubmit( { addUser, navigate } )}
            >
                <Title titleType="h1" class="mb-2 text-left text-xs font-extrabold text-main-gray-250">
                    Login
                </Title>
                <div class="mb-4">
                    <Input
                        name="email"
                        type="text"
                        id="email"
                        class="dg-form-field-full font-extrabold pl-5"
                        placeholder="Your Email"
                        labelClass="text-main-gray-200 block mb-2"
                        labelName="Email"
                    />
                </div>
                <div>
                    <PasswordShowHide
                        name="password"
                        id="password"
                        class="dg-form-field-full font-extrabold pl-5"
                        placeholder="Your Password"
                        labelClass="text-main-gray-200 block my-3"
                        labelName="Password"
                    />
                    <div class="flex items-center justify-between">
                        <Button
                            name="forgotPassword"
                            onClick={props.onClick}
                            class="no-underline inline-block align-baseline font-bold text-sm text-blue hover:text-blue-dark "
                        >
                            Forgot Password?
                        </Button>
                    </div>
                </div>
                <div class="mt-10 flex justify-center">
                    <Button
                        type="submit"
                        class="mx-auto text-white bg-primary-main border-0 py-2 focus:outline-none hover:bg-primary-hover rounded-full text-sm font-bold w-32 text-center"
                    >
                        Login
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default LoginForm;