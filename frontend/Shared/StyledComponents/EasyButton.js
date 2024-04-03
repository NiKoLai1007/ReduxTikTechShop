import styled, { css } from "styled-components";

const EasyButton = styled.TouchableOpacity`
    flex-direction: row;
    border-radius: 100px;
    padding: 15px;
    margin: 5px;
    justify-content: center;
    background: transparent;

    ${(props) =>
        props.primary &&
        css`
            background: #5cb85c;
        `
    }

    ${(props) =>
        props.secondary &&
        css`
            background: #62b1f6;
        `
    }

    ${(props) => 
        props.danger &&
        css`
            background: #f40105;
        `
    }

    ${(props) => 
        props.large &&
        css`
            width: 135px;
        `
    }

    ${(props) => 
        props.medium &&
        css`
            width: 100px;
        `
    }

    ${(props) => 
        props.small &&
        css`
            width: 40px;
        `
    }

    ${(props) =>
        props.login &&
        css`
            background: #C49D19;
            width: 350px;
        `
    }

    ${(props) =>
        props.register &&
        css`
            background: #C49D19;
            width: 100px;
        `
    }
`;

export default EasyButton