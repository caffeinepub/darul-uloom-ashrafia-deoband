import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import AccessControl "authorization/access-control";
import Stripe "stripe/stripe";
import MixinAuthorization "authorization/MixinAuthorization";
import OutCall "http-outcalls/outcall";



actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Course = {
    id : Nat;
    title : Text;
    description : Text;
    instructor : Text;
    schedule : Text;
    language : Text;
    enrollmentOpen : Bool;
  };

  let userProfiles = Map.empty<Principal, {
    name : Text;
    email : Text;
    phone : Text;
  }>();

  let courses = Map.empty<Nat, Course>();

  // Add at end due to migration compatibility
  let courseLiveStatus = Map.empty<Nat, Bool>();

  let applications = Map.empty<Nat, {
    name : Text;
    email : Text;
    phone : Text;
    course : Text;
    message : Text;
    timestamp : Int;
  }>();

  // Add at end due to migration compatibility
  let courseEnrollments = Map.empty<Nat, {
    courseId : Nat;
    studentName : Text;
    email : Text;
    plan : Text;
    currency : Text;
    timestamp : Int;
  }>();

  let contactMessages = Map.empty<Nat, {
    name : Text;
    email : Text;
    phone : Text;
    subject : Text;
    message : Text;
    timestamp : Int;
  }>();

  let donations = Map.empty<Nat, {
    donorName : Text;
    email : Text;
    amount : Int;
    currency : Text;
    purpose : Text;
    timestamp : Int;
  }>();

  let announcements = Map.empty<Nat, {
    title : Text;
    body : Text;
    date : Int;
    language : Text;
  }>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?{
    name : Text;
    email : Text;
    phone : Text;
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?{
    name : Text;
    email : Text;
    phone : Text;
  } {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : {
    name : Text;
    email : Text;
    phone : Text;
  }) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Admission Applications
  public shared ({ caller }) func submitApplication(name : Text, email : Text, phone : Text, course : Text, message : Text) : async () {
    let timestamp = Time.now();
    let appId = Int.abs(timestamp);
    let application = {
      name;
      email;
      phone;
      course;
      message;
      timestamp;
    };
    applications.add(appId, application);
  };

  public query ({ caller }) func getAllApplications() : async [{
    name : Text;
    email : Text;
    phone : Text;
    course : Text;
    message : Text;
    timestamp : Int;
  }] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can get all applications");
    };
    applications.values().toArray();
  };

  // Contact Messages
  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, phone : Text, subject : Text, message : Text) : async () {
    let timestamp = Time.now();
    let msgId = Int.abs(timestamp);
    let contactMsg = {
      name;
      email;
      phone;
      subject;
      message;
      timestamp;
    };
    contactMessages.add(msgId, contactMsg);
  };

  public query ({ caller }) func getAllContactMessages() : async [{
    name : Text;
    email : Text;
    phone : Text;
    subject : Text;
    message : Text;
    timestamp : Int;
  }] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can get all contact messages");
    };
    contactMessages.values().toArray();
  };

  // Courses
  public query ({ caller }) func getCourses() : async [Course] {
    courses.values().toArray();
  };

  public shared ({ caller }) func addCourse(course : Course) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add courses");
    };
    courses.add(course.id, course);
  };

  public shared ({ caller }) func updateCourse(course : Course) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update courses");
    };
    courses.add(course.id, course);
  };

  // Announcements
  public query ({ caller }) func getAnnouncements() : async [{
    title : Text;
    body : Text;
    date : Int;
    language : Text;
  }] {
    announcements.values().toArray();
  };

  public shared ({ caller }) func createAnnouncement(announcement : {
    title : Text;
    body : Text;
    date : Int;
    language : Text;
  }) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create announcements");
    };
    let id = Int.abs(Time.now());
    announcements.add(id, announcement);
  };

  public shared ({ caller }) func updateAnnouncement(id : Nat, announcement : {
    title : Text;
    body : Text;
    date : Int;
    language : Text;
  }) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update announcements");
    };
    if (not announcements.containsKey(id)) {
      Runtime.trap("Announcement does not exist");
    };
    announcements.add(id, announcement);
  };

  public shared ({ caller }) func deleteAnnouncement(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete announcements");
    };
    switch (announcements.get(id)) {
      case (null) {
        Runtime.trap("Announcement does not exist");
      };
      case (?_) {
        announcements.remove(id);
      };
    };
  };

  // Donations
  public shared ({ caller }) func recordDonation(donation : {
    donorName : Text;
    email : Text;
    amount : Int;
    currency : Text;
    purpose : Text;
    timestamp : Int;
  }) : async () {
    let id = Int.abs(Time.now());
    donations.add(id, donation);
  };

  public query ({ caller }) func getAllDonations() : async [{
    donorName : Text;
    email : Text;
    amount : Int;
    currency : Text;
    purpose : Text;
    timestamp : Int;
  }] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all donations");
    };
    donations.values().toArray();
  };

  // Stripe integration for donations
  var stripeConfig : ?Stripe.StripeConfiguration = null;

  public query ({ caller }) func isStripeConfigured() : async Bool {
    stripeConfig != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can set Stripe configuration");
    };
    stripeConfig := ?config;
  };

  public query ({ caller }) func getStripeConfiguration() : async Stripe.StripeConfiguration {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view Stripe configuration");
    };
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe needs to be configured first") };
      case (?config) { config };
    };
  };

  public shared ({ caller }) func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can check session status");
    };
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe configuration missing") };
      case (?config) {
        await Stripe.getSessionStatus(config, sessionId, transform);
      };
    };
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create checkout sessions");
    };
    switch (stripeConfig) {
      case (null) { Runtime.trap("Stripe configuration missing") };
      case (?config) {
        await Stripe.createCheckoutSession(config, caller, items, successUrl, cancelUrl, transform);
      };
    };
  };

  public query ({ caller }) func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Course Enrollment - New Functionality
  public shared ({ caller }) func recordEnrollment(courseId : Nat, studentName : Text, email : Text, plan : Text, currency : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("That action requires at least user role");
    };

    switch (courses.get(courseId)) {
      case (null) { Runtime.trap("Course does not exist") };
      case (?course) {
        if (not course.enrollmentOpen) {
          Runtime.trap("Enrollment for this course is closed");
        };

        // Generate a unique ID for each enrollment record (timestamp fallback)
        let enrollmentId : Nat = Int.abs(Time.now());
        let enrollment = { courseId; studentName; email; plan; currency; timestamp = Time.now() };

        courseLiveStatus.add(courseId, false);
        courseEnrollments.add(enrollmentId, enrollment);
      };
    };
  };

  public query ({ caller }) func getAllEnrollments() : async [{
    courseId : Nat;
    studentName : Text;
    email : Text;
    plan : Text;
    currency : Text;
    timestamp : Int;
  }] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Only admins can access all enrollments");
    };
    courseEnrollments.values().toArray();
  };

  public shared ({ caller }) func setCourseLive(courseId : Nat, isLive : Bool) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Only admins can update course live status");
    };
    if (not courses.containsKey(courseId)) {
      Runtime.trap("Course does not exist");
    };
    courseLiveStatus.add(courseId, isLive);
  };

  public query ({ caller }) func getCourseLiveStatus() : async [(Nat, Bool)] {
    courseLiveStatus.toArray();
  };

  public query ({ caller }) func getCourseLiveStatusFor(courseId : Nat) : async Bool {
    switch (courseLiveStatus.get(courseId)) {
      case (null) { false };
      case (?isLive) { isLive };
    };
  };
};
