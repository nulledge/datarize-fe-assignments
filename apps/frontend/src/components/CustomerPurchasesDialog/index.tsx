import { FunctionComponent } from "react";

import * as Dialog from '@radix-ui/react-dialog';
import { CustomerPurchases } from "@components/CustomerPurchases";
import { Container, Dimmed, ScrollContainer } from "./style";

type Props = {
    id: number | null;
    onClose: () => void;
};

export const CustomerPurchasesDialog: FunctionComponent<Props> = ({ id, onClose }) => {
    const open = id !== null;

    return (
        <Dialog.Root open={open} onOpenChange={(value) => (!value && onClose())}>
            <Dialog.Portal>
                <Dialog.Overlay asChild>
                    <Dimmed />
                </Dialog.Overlay>
                <Dialog.Content asChild>
                    <Container>
                        <Dialog.Title>
                            상세 구매내역
                        </Dialog.Title>
                        <ScrollContainer>
                            {open && <CustomerPurchases id={id} />}
                        </ScrollContainer>
                        <Dialog.Close>
                            닫기
                        </Dialog.Close>
                    </Container>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};