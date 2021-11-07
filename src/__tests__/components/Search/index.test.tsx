import { render, fireEvent, waitFor, screen  } from "@testing-library/react";
import api from "../../../services";
import MockAdapter from "axios-mock-adapter";
import Search from "../../../components/Search";
import Providers from "../../../providers";
import Address from "../../../components/Cep";

const apiMock = new MockAdapter(api);

describe("Search Components", () => {
    test("should be able to render an input", () => {
        render(<Search />);
        const InputElement = screen.getByPlaceholderText("Insira o CEP");
        expect(InputElement).toBeInTheDocument();
    });
    
    test("should be able to render a button", () => {
        render(<Search />);
        const ButtonElement = screen.getByText("Buscar pelo CEP");
        expect(ButtonElement).toBeInTheDocument();
    });
});

describe("Search Component", () => {
	it("Should be able to search and find an address for a valid CEP", async () => {
        
        apiMock.onGet("08032008").replyOnce(200, {
            bairro: "Vila Nova Curuçá",
            cidade: "São Paulo",
            logradouro: "Rua Passeio Público",
            estado_info: {
              area_km2: "248.221,996",
              codigo_ibge: "35",
              nome: "São Paulo",
            },
            cep: "08032008",
            cidade_info: {
              area_km2: "1521,11",
              codigo_ibge: "3550308",
            },
            estado: "SP"
        });

        render(
            <Providers>
                <Search />
                <Address />
            </Providers>
        );

        const InputElement = screen.getByPlaceholderText("Insira o CEP");
        const ButtonElement = screen.getByText("Buscar pelo CEP");

        fireEvent.change(InputElement, { target: { value: "08032008" }});
        fireEvent.click(ButtonElement);

        await waitFor(() => {
            const content = screen.getByDisplayValue("Rua Passeio Público");
            expect(content).toBeInTheDocument();
        });
    });
});