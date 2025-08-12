import companyProfilePDF from "../assets/WallTeQ-Profile.pdf";

const CompanyProfile = () => {
    return (
        <div className="w-full min-h-screen bg-slate-900 text-white flex items-center justify-center">
            <iframe
                src={companyProfilePDF}
                width="100%"
                height="100%"
                className="border-0"
                title="Company Profile"
                style={{ position: "absolute", top: 0, left: 0 }}
            />
        </div>
    );
};

export default CompanyProfile;


