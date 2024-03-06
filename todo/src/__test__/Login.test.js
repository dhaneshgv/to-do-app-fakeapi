// import Login from "../Login";
// import { render ,screen} from "@testing-library/react";

// test('checking component loaded',() =>{
//     // steps for testing heading element loaded
//     render(<Login/>);
//     expect(screen.queryByText(/Login/)).toBeInTheDocument();
// });
// test('input box loaded',() =>{
//     // steps for testing heading element loaded
//     render(<Login/>);
//     expect(screen.querybypalceholder("Email")).toHaveValue("");
//     expect(screen.querybypalceholder("Password")).toHaveValue("");
// });


import { render, screen } from '@testing-library/react';
import Login from '../Login';

test('checking component loaded', () => {
    // steps for testing heading element loaded
    render(<Login />);
    // expect(screen.queryByText(/Login/)).toBeInTheDocument();
    const linkElement = screen.getByText(/Login/);
    expect(linkElement).toBeInTheDocument();
})

test('checking email & password inputs are empty', () => {
    render(<Login />);
    expect(screen.queryByPlaceholderText('Email')).toHaveValue("");
    expect(screen.queryByPlaceholderText('Password')).toHaveValue("");
})
