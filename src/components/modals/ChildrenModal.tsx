import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
} from "@nextui-org/react";
import { FaPeopleArrows } from "react-icons/fa";
import { MdChildFriendly } from "react-icons/md";
import { IoBed } from "react-icons/io5";

interface AppProps {
  setAdults: React.Dispatch<React.SetStateAction<number>>;
  setChildren: React.Dispatch<React.SetStateAction<number>>;
  setRooms: React.Dispatch<React.SetStateAction<number>>;
}

export default function ChildrenModal({
  setAdults,
  setChildren,
  setRooms,
}: AppProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary" variant="ghost">
        # of Individuals
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Individuals
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <FaPeopleArrows className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Adults"
                  placeholder="how many Adults..."
                  type="number"
                  variant="bordered"
                  onChange={(e) => setAdults(parseInt(e.target.value))}
                />
                <Input
                  endContent={
                    <MdChildFriendly className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Children"
                  placeholder="how many Children..."
                  type="number"
                  variant="bordered"
                  onChange={(e) => setChildren(parseInt(e.target.value))}
                />
                <Input
                  endContent={
                    <IoBed className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Rooms"
                  placeholder="how many Rooms..."
                  type="number"
                  variant="bordered"
                  onChange={(e) => setRooms(parseInt(e.target.value))}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember this
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Done
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
