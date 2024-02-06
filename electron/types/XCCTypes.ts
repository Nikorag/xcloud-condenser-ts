export interface XCCData {
    products : Product[]
}

export interface Product {
    LastModifiedDate:         Date;
    LocalizedProperties:      ProductLocalizedProperty[];
    MarketProperties:         ProductMarketProperty[];
    ProductASchema:           string;
    ProductBSchema:           string;
    ProductId:                string;
    Properties:               ProductProperties;
    AlternateIds:             AlternateID[];
    DomainDataVersion:        null;
    IngestionSource:          string;
    IsMicrosoftProduct:       boolean;
    PreferredSkuId:           string;
    ProductType:              string;
    ValidationData:           ValidationData;
    MerchandizingTags:        any[];
    PartD:                    string;
    SandboxId:                string;
    ProductFamily:            string;
    SchemaVersion:            string;
    IsSandboxedProduct:       boolean;
    ProductKind:              string;
    ProductPolicies:          ProductPolicies;
    DisplaySkuAvailabilities: DisplaySkuAvailability[];
}

export interface AlternateID {
    IdType: string;
    Value:  string;
}

export interface DisplaySkuAvailability {
    Sku:                          Sku;
    Availabilities:               Availability[];
    HistoricalBestAvailabilities: HistoricalBestAvailability[];
}

export interface Availability {
    Actions:             string[];
    AvailabilityASchema: string;
    AvailabilityBSchema: string;
    AvailabilityId:      string;
    Conditions:          AvailabilityConditions;
    LastModifiedDate:    Date;
    Markets:             string[];
    OrderManagementData: OrderManagementData;
    Properties:          AvailabilityProperties;
    SkuId:               string;
    DisplayRank:         number;
    AlternateIds:        AlternateID[];
    RemediationRequired: boolean;
    Remediations?:       AvailabilityRemediation[];
    LicensingData?:      LicensingData;
    AffirmationId?:      string;
}

export interface AvailabilityConditions {
    ClientConditions: ClientConditions;
    EndDate:          Date;
    ResourceSetIds:   string[];
    StartDate:        Date;
}

export interface ClientConditions {
    AllowedPlatforms: AllowedPlatform[];
}

export interface AllowedPlatform {
    MaxVersion:   number;
    MinVersion:   number;
    PlatformName: string;
}

export interface LicensingData {
    SatisfyingEntitlementKeys: SatisfyingEntitlementKey[];
}

export interface SatisfyingEntitlementKey {
    EntitlementKeys:      string[];
    LicensingKeyIds:      string[];
    PreOrderReleaseDate?: Date;
}

export interface OrderManagementData {
    GrantedEntitlementKeys: any[];
    PIFilter?:              PIFilter;
    Price:                  Price;
}

export interface PIFilter {
    ExclusionProperties: string[];
    InclusionProperties: string[];
}

export interface Price {
    CurrencyCode:          string;
    IsPIRequired:          boolean;
    ListPrice:             number;
    MSRP:                  number;
    TaxType:               string;
    WholesaleCurrencyCode: string;
    WholesalePrice?:       number;
}

export interface AvailabilityProperties {
    OriginalReleaseDate?: Date;
    MerchandisingTags?:   string[];
}

export interface AvailabilityRemediation {
    RemediationId: string;
    Type:          string;
    BigId:         string;
}

export interface HistoricalBestAvailability {
    Actions:             string[];
    AvailabilityASchema: string;
    AvailabilityBSchema: string;
    AvailabilityId:      string;
    Conditions:          HistoricalBestAvailabilityConditions;
    LastModifiedDate:    Date;
    Markets:             string[];
    OrderManagementData: OrderManagementData;
    Properties:          AvailabilityProperties;
    SkuId:               string;
    DisplayRank:         number;
    AlternateIds:        AlternateID[];
    ProductASchema:      string;
}

export interface HistoricalBestAvailabilityConditions {
    ClientConditions:        ClientConditions;
    EndDate:                 Date;
    ResourceSetIds:          string[];
    StartDate:               Date;
    EligibilityPredicateIds: string[];
    SupportedCatalogVersion: number;
}

export interface Sku {
    LastModifiedDate:     Date;
    LocalizedProperties:  SkuLocalizedProperty[];
    MarketProperties:     SkuMarketProperty[];
    ProductId:            string;
    Properties:           SkuProperties;
    SkuASchema:           string;
    SkuBSchema:           string;
    SkuId:                string;
    SkuType:              string;
    RecurrencePolicy:     null;
    SubscriptionPolicyId: null;
}

export interface SkuLocalizedProperty {
    Contributors:              any[];
    Features:                  any[];
    MinimumNotes:              string;
    RecommendedNotes:          string;
    ReleaseNotes:              string;
    DisplayPlatformProperties: null;
    SkuDescription:            string;
    SkuTitle:                  string;
    SkuButtonTitle:            string;
    DeliveryDateOverlay:       null;
    SkuDisplayRank:            any[];
    TextResources:             null;
    Images:                    any[];
    LegalText:                 LegalText;
    Language:                  string;
    Markets:                   string[];
}

export interface LegalText {
    AdditionalLicenseTerms: string;
    Copyright:              string;
    CopyrightUri:           string;
    PrivacyPolicy:          string;
    PrivacyPolicyUri:       string;
    Tou:                    string;
    TouUri:                 string;
}

export interface SkuMarketProperty {
    FirstAvailableDate: Date;
    SupportedLanguages: string[];
    PackageIds:         null;
    PIFilter:           null;
    Markets:            string[];
}

export interface SkuProperties {
    EarlyAdopterEnrollmentUrl:     null;
    FulfillmentData:               FulfillmentData;
    FulfillmentType:               string;
    FulfillmentPluginId:           null;
    HasThirdPartyIAPs:             boolean;
    LastUpdateDate:                Date;
    HardwareProperties:            HardwareProperties;
    HardwareRequirements:          any[];
    HardwareWarningList:           any[];
    InstallationTerms:             string;
    Packages:                      Package[];
    VersionString:                 string;
    SkuDisplayGroupIds:            string[] | null;
    XboxXPA:                       boolean;
    BundledSkus:                   any[];
    IsRepurchasable:               boolean;
    SkuDisplayRank:                number;
    DisplayPhysicalStoreInventory: null;
    VisibleToB2BServiceIds:        any[];
    AdditionalIdentifiers:         any[];
    IsTrial:                       boolean;
    IsPreOrder:                    boolean;
    IsBundle:                      boolean;
}

export interface FulfillmentData {
    ProductId:         string;
    WuBundleId:        string;
    WuCategoryId:      string;
    PackageFamilyName: string;
    SkuId:             string;
    Content:           null;
    PackageFeatures:   null;
}

export interface HardwareProperties {
    MinimumHardware:      any[];
    RecommendedHardware:  any[];
    MinimumProcessor:     null;
    RecommendedProcessor: null;
    MinimumGraphics:      null;
    RecommendedGraphics:  null;
}

export interface Package {
    Applications:                any[];
    Architectures:               string[];
    Capabilities:                any[];
    DeviceCapabilities:          any[];
    ExperienceIds:               any[];
    FrameworkDependencies:       any[];
    HardwareDependencies:        any[];
    HardwareRequirements:        any[];
    Hash:                        string;
    HashAlgorithm:               string;
    IsStreamingApp:              boolean;
    Languages:                   any[];
    MaxDownloadSizeInBytes:      number;
    MaxInstallSizeInBytes:       number;
    PackageFormat:               string;
    PackageFamilyName:           null;
    MainPackageFamilyNameForDlc: null;
    PackageFullName:             string;
    PackageId:                   string;
    ContentId:                   string;
    KeyId:                       string;
    PackageRank:                 number;
    PackageUri:                  string;
    PlatformDependencies:        PlatformDependency[];
    PlatformDependencyXmlBlob:   string;
    ResourceId:                  string;
    Version:                     string;
    PackageDownloadUris:         PackageDownloadUris[];
    DriverDependencies:          any[];
    FulfillmentData:             FulfillmentData;
}

export interface PackageDownloadUris {
    Rank: number;
    Uri:  string;
}

export interface PlatformDependency {
    MaxTested:    number;
    MinVersion:   number;
    PlatformName: string;
}

export interface ProductLocalizedProperty {
    DeveloperName:          string;
    PublisherName:          string;
    PublisherAddress:       null;
    PublisherWebsiteUri:    string;
    SupportUri:             string;
    SupportPhone:           null;
    EligibilityProperties:  EligibilityProperties;
    Franchises:             any[];
    Images:                 Image[];
    Videos:                 any[];
    ProductDescription:     string;
    ProductTitle:           string;
    ShortTitle:             string;
    SortTitle:              string;
    FriendlyTitle:          null;
    ShortDescription:       string;
    SearchTitles:           SearchTitle[];
    VoiceTitle:             string;
    RenderGroupDetails:     null;
    ProductDisplayRanks:    any[];
    InteractiveModelConfig: null;
    Interactive3DEnabled:   boolean;
    Language:               string;
    Markets:                string[];
}

export interface EligibilityProperties {
    Remediations: EligibilityPropertiesRemediation[];
    Affirmations: Affirmation[];
}

export interface Affirmation {
    AffirmationId:        string;
    AffirmationProductId: string;
    Description:          string;
}

export interface EligibilityPropertiesRemediation {
    RemediationId: string;
    Description:   string;
}

export interface Image {
    FileId:                  string;
    EISListingIdentifier:    null;
    BackgroundColor:         string;
    Caption:                 string;
    FileSizeInBytes:         number;
    ForegroundColor:         string;
    Height:                  number;
    ImagePositionInfo:       string;
    ImagePurpose:            string;
    UnscaledImageSHA256Hash: string;
    Uri:                     string;
    Width:                   number;
}

export interface SearchTitle {
    SearchTitleString: string;
    SearchTitleType:   string;
}

export interface ProductMarketProperty {
    OriginalReleaseDate: Date;
    MinimumUserAge:      number;
    ContentRatings:      ContentRating[];
    RelatedProducts:     RelatedProduct[];
    UsageData:           UsageDatum[];
    BundleConfig:        null;
    Markets:             string[];
}

export interface ContentRating {
    RatingSystem:        string;
    RatingId:            string;
    RatingDescriptors:   string[];
    RatingDisclaimers:   any[];
    InteractiveElements: any[];
}

export interface RelatedProduct {
    RelatedProductId: string;
    RelationshipType: string;
}

export interface UsageDatum {
    AggregateTimeSpan: string;
    AverageRating:     number;
    PlayCount:         number;
    RatingCount:       number;
    RentalCount:       string;
    TrialCount:        string;
    PurchaseCount:     string;
}

export interface ProductPolicies {
}

export interface ProductProperties {
    Attributes:                           Attribute[];
    CanInstallToSDCard:                   boolean;
    Category:                             string;
    Categories:                           string[];
    Subcategory:                          null;
    IsAccessible:                         boolean;
    IsDemo:                               boolean;
    IsLineOfBusinessApp:                  boolean;
    IsPublishedToLegacyWindowsPhoneStore: boolean;
    IsPublishedToLegacyWindowsStore:      boolean;
    PackageFamilyName:                    string;
    PackageIdentityName:                  string;
    PublisherCertificateName:             string;
    PublisherId:                          string;
    SkuDisplayGroups:                     SkuDisplayGroup[];
    XboxLiveTier:                         string;
    XboxXPA:                              null;
    XboxCrossGenSetId:                    null;
    XboxConsoleGenOptimized:              string[];
    XboxConsoleGenCompatible:             string[];
    XboxLiveGoldRequired:                 boolean;
    ExtendedMetadata:                     string;
    XBOX:                                 Xbox;
    ExtendedClientMetadata:               ProductPolicies;
    OwnershipType:                        null;
    PdpBackgroundColor:                   string;
    HasAddOns:                            boolean;
    RevisionId:                           Date;
    ProductGroupId:                       string;
    ProductGroupName:                     string;
}

export interface Attribute {
    Name:                string;
    Minimum:             null;
    Maximum:             null;
    ApplicablePlatforms: null;
    Group:               null;
}

export interface SkuDisplayGroup {
    Id:        string;
    Treatment: string;
}

export interface Xbox {
    XboxGamingMetadata: string;
}

export interface ValidationData {
    PassedValidation:    boolean;
    RevisionId:          string;
    ValidationResultUri: string;
}
