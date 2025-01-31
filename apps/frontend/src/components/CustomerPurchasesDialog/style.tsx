import styled from '@emotion/styled';

export const Dimmed = styled.div`
    background-color: black;
    opacity: 0.5;
    position: fixed;
	inset: 0;
`;

export const Container = styled.div`
	background-color: white;
	border-radius: 6px;
	box-shadow: var(--shadow-6);
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 90vw;
	max-width: 500px;
	max-height: 85vh;
	padding: 25px;
    display: flex;
    flex-flow: column;
    overflow: auto;
`;

export const ScrollContainer = styled.div`
    overflow: auto;
`;