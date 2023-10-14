import styled from "styled-components";


export const cadastro = styled.div<{$modal?:boolean}>`
    width: 100%;
    height: ${props => props.$modal ? '0px' : '190px'};
    overflow: hidden;
    background-color:#E0E0E0;
    display: flex;
    flex-direction: column;
    transition: all .3s ease-in-out;
    justify-content: center;
`;

export const Alerta = styled.div<{$teste?:boolean}>`
    width: ${props => props.$teste ? '300px' : '0px'};
    border-left: ${props => props.$teste ? '5px solid #33691E' : 'none'};
    
    @media (max-width:500px) {
        width:${props => props.$teste ? '130px' : '0px'} ;
    }
`;
export const AlertaDelete = styled.div<{$alertaDelete?:boolean}>`
    width: ${props => props.$alertaDelete ? '300px' : '0px'};
    border-left: ${props => props.$alertaDelete ? '5px solid #D80032' : 'none'};
	height: 70px;
	background-color:#F9F2ED;
	position: fixed;
	z-index: 1;
	top: 0;
	right: 0;
	margin: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 5px;
	transition: all .3s ease-in-out;
	overflow: hidden;

    @media (max-width:500px) {
        width:${props => props.$alertaDelete ? '130px' : '0px'} ;
        height: 40px;
    }
`;

export const BtnBaixa = styled.button<{$baixa?:boolean}>`
    padding: 10px;
    cursor: ${props => props.$baixa ? 'pointer' : 'not-allowed'};
    opacity: ${props => props.$baixa ? '1' : '0.5'};
    transition: all .2s ease-in-out;

    @media (max-width:450px) {
        padding: 5px;
        font-size: .7rem;
    }
`;



