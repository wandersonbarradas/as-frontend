type Props = {
    onClose: () => void;
    children: React.ReactNode;
};

export const Modal = ({ onClose, children }: Props) => {
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/70 flex flex-col items-center overflow-y-auto">
            <div className="w-full max-w-xl my-3 flex justify-end">
                <div
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-gray-800 text-white text-lg flex justify-center items-center cursor-pointer hover:bg-gray-500"
                >
                    X
                </div>
            </div>
            <div className="bg-gray-800 w-full max-w-xl p-4 rounded-md mb-5">
                {children}
            </div>
        </div>
    );
};
